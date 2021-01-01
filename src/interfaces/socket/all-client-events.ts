import { ServerToClientEvents } from './server-to-client-events';
import { SocketClientDisconnectReasonType } from './socket-client-disconnect-reason-type';

export interface AllClientEvents extends ServerToClientEvents {
  /**
   * Fired upon connection to the Namespace (including a successful reconnection).
   */
  connect: () => void;

  /**
   * Fired when an namespace middleware error occurs.
   */
  connect_error: (error: any) => void;

  /**
   * Fired upon disconnection.
   */
  disconnect: (reason: SocketClientDisconnectReasonType) => void;

  /**
   * Fired upon a connection error.
   */
  error: (error: any) => void;

  /**
   * Fired upon a successful reconnection.
   */
  reconnect: (attempt: number) => void;

  /**
   * Fired upon an attempt to reconnect.
   */
  reconnect_attempt: (attempt: number) => void;

  /**
   * Fired upon a reconnection attempt error.
   */
  reconnect_error: (error: any) => void;

  /**
   * Fired when couldn’t reconnect within reconnectionAttempts.
   */
  reconnect_failed: () => void;

  /**
   * Fired when a ping packet is received from the server.
   */
  ping: () => void;
}
