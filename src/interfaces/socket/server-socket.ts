import { StrictEventEmitter } from 'strict-event-emitter-types';
import { ClientToServerEvents } from './client-to-server-events';
import { ServerToClientEvents } from './server-to-client-events';

export type ServerSocket = StrictEventEmitter<
  SocketIO.Socket,
  ClientToServerEvents,
  ServerToClientEvents
>;
