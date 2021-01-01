import { StrictEventEmitter } from 'strict-event-emitter-types';
import { AllClientEvents } from './all-client-events';
import { ClientToServerEvents } from './client-to-server-events';

export type ClientSocket = StrictEventEmitter<
  SocketIOClient.Socket,
  AllClientEvents,
  ClientToServerEvents
>;
