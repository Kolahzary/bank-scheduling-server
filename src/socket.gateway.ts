import { SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { SOCKET_BIND_PORT } from './environment';
import { ServerSocket, StartedMessage, StartMessage } from './interfaces';

@WebSocketGateway(SOCKET_BIND_PORT, {
  serveClient: false
})
export class SocketGateway {
  serversIdCounter = 1;
  employeesIdCounter = 1;
  customersIdCounter = 1;

  @SubscribeMessage('/start')
  handleStartMessage(client: ServerSocket, payload: StartMessage): WsResponse<StartedMessage> {
    let id: number;
    if (payload.role === 'server') {
      this.joinAsync(client, '/servers');
      id = this.serversIdCounter++;
    } else if (payload.role === 'employee') {
      this.joinAsync(client, '/employees');
      id = this.employeesIdCounter++;
    } else {
      this.joinAsync(client, '/customers');
      id = this.customersIdCounter++;
    } 

    return {
      event: '/started',
      data: {
        id
      }
    }
  }
  
  /**
   * Async join client to room
   * 
   * @param client Socket
   * @param room Room name to join
   */
  joinAsync(client: ServerSocket, room: string): Promise<void> {
    return new Promise((resolve, reject) => {
      client.join(room, (err?: any) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
}
