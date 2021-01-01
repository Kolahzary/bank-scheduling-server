import { TurnMessage } from '~/interfaces';
import { getMessageAsync } from './get-message';

export function getTurnMessageAsync(
  client: SocketIOClient.Socket,
): Promise<TurnMessage> {
  return getMessageAsync<TurnMessage>(client, '/turn');
}
