import {
  ClientSocket,
  StartedMessage,
  StartMessage,
} from '~/interfaces';

export function startSocket(
  client: ClientSocket,
  message: StartMessage,
): Promise<StartedMessage> {
  return new Promise<StartedMessage>((resolve) => {
    client.once('/started', (message) => {
      resolve(message);
    });
    client.emit('/start', message);
  });
}
