export interface TicketMessage {
  id: number;
  positionInQueue: number;
  waitingCustomers: number;
  activeEmployees: number;
  approximateWaitingMinutes: number;
}
