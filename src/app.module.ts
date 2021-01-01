import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SocketGateway } from './socket.gateway';
import { CustomerQueueService } from './services';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [SocketGateway, CustomerQueueService],
})
export class AppModule {}
