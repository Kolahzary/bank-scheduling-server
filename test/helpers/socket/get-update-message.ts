import { UpdateMessage } from '~/interfaces';
import { getMessageAsync } from './get-message';

export function getUpdateMessageAsync(
  client: SocketIOClient.Socket,
): Promise<UpdateMessage> {
  return getMessageAsync<UpdateMessage>(client, '/update');
}
