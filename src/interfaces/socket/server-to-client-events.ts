import {
  StartedMessage, TicketMessage, TurnMessage, UpdateMessage,
} from '../messages';

export interface ServerToClientEvents {
  '/started': (message: StartedMessage) => void;

  /**
   * Sent only to Server-terminal users
   */
  '/update': (message: UpdateMessage) => void;

  /**
   * Sent to customers immediately after start
   */
  '/ticket': (message: TicketMessage) => void;

  /**
   * Sent to customers when an employee sent /call-customer and it's current customer's turn in queue
   */
  '/turn': (message: TurnMessage) => void;
}
