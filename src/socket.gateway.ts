import { SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { SOCKET_BIND_PORT } from './environment';
import { StartedMessage, StartMessage } from './interfaces';

@WebSocketGateway(SOCKET_BIND_PORT, {
  serveClient: false
})
export class SocketGateway {
  @SubscribeMessage('/start')
  handleMessage(client: any, payload: StartMessage): WsResponse<StartedMessage> {
    return {
      event: '/started',
      data: {
        id: 1
      }
    }
  }
}
