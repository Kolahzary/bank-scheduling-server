import { StartMessage } from '../messages';

export interface ClientToServerEvents {
  /**
   * Should be sent after client connect
   */
  '/start': (message: StartMessage) => void;

  /**
   * Sent by employee when current customer's job is done and employee is free to accept new customers
   */
  '/call-customer': () => void
}
