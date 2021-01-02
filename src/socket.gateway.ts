import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { SOCKET_BIND_PORT, MINUTES_PER_CUSTOMER } from '~/environment';
import { Employee, ServerSocket, StartMessage } from './interfaces';
import { CustomerQueueService } from './services';

@WebSocketGateway(SOCKET_BIND_PORT, {
  serveClient: false,
})
export class SocketGateway {
  employees: Employee[] = [];

  serversIdCounter = 0;
  employeesIdCounter = 0;
  customersIdCounter = 0;

  constructor(private customerQueue: CustomerQueueService) {}

  @SubscribeMessage('/start')
  handleStartMessage(client: ServerSocket, payload: StartMessage): void {
    let id: number;
    if (payload.role === 'server') {
      this.joinAsync(client, '/servers');
      id = this.serversIdCounter++;
    } else if (payload.role === 'employee') {
      this.joinAsync(client, '/employees');
      id = this.employeesIdCounter++;

      this.employees.push({
        id,
        name: payload.name,
        socketId: client.id,
      });
    } else {
      this.joinAsync(client, '/customers');
      id = this.customersIdCounter++;

      this.customerQueue.add({
        id,
        name: payload.name,
        socketId: client.id,
        isProcessed: false,
      });
    }

    client.emit('/started', { id });
    this.sendUpdateToServerTerminals(client);

    if (payload.role === 'customer') {
      // send ticket
      client.emit('/ticket', {
        id,
        activeEmployees: this.employees.length,
        approximateWaitingMinutes:
          (this.customerQueue.countNotProcessed() * MINUTES_PER_CUSTOMER) /
          this.employees.length,
        waitingCustomers: this.customerQueue.countNotProcessed(),
        positionInQueue: this.customerQueue.idOfLast() + 1,
      });
    }
  }

  @SubscribeMessage('/call-customer')
  handleCallCustomerMessage(client: ServerSocket, payload: {}): void {
    if (this.customerQueue.hasNext()) {
      const customer = this.customerQueue.getNext();
      customer.isProcessed = true;

      const customerSocket: ServerSocket = client.to(customer.socketId);
      const employee = this.employees.find((x) => x.socketId === client.id);
      customerSocket.emit('/turn', {
        employeeId: employee.id,
        employeeName: employee.name,
      });

      this.sendUpdateToServerTerminals(client);
    }
  }

  private sendUpdateToServerTerminals(client: ServerSocket): void {
    const serverTerminals: ServerSocket = client.to('/servers');
    serverTerminals.emit('/update', {
      minutesPerCustomer: MINUTES_PER_CUSTOMER,
      approximateWaitingMinutes:
        (this.customerQueue.countNotProcessed() * MINUTES_PER_CUSTOMER) /
        this.employees.length,
      customers: this.customerQueue.customers,
      employees: this.employees,
    });
  }

  /**
   * Async join client to room
   *
   * @param client Socket
   * @param room Room name to join
   */
  private joinAsync(client: ServerSocket, room: string): Promise<void> {
    return new Promise((resolve, reject) => {
      client.join(room, (err?: any) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
