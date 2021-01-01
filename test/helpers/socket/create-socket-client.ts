import * as io from 'socket.io-client';
import { ClientSocket } from '~/interfaces';
import { SOCKET_ADDRESS } from '../environment';

export function createSocketClientAsync(): Promise<ClientSocket> {
  return new Promise<ClientSocket>((resolve, reject) => {
    const client: ClientSocket = io(SOCKET_ADDRESS, {
      transports: ['websocket'],
      autoConnect: false,
      reconnection: false,
    }) as any;

    client.on('error', () => {
      reject('error connecting socket');
    });

    client.on('connect', () => {
      resolve(client);
    });

    client.connect();
  });
}
