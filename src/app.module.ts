import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [SocketGateway],
})
export class AppModule {}
