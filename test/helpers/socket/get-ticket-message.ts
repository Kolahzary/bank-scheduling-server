import { TicketMessage } from '~/interfaces';
import { getMessageAsync } from './get-message';

export function getTicketMessageAsync(
  client: SocketIOClient.Socket,
): Promise<TicketMessage> {
  return getMessageAsync<TicketMessage>(client, '/ticket');
}
