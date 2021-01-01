import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SOCKET_BIND_PORT } from './environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(SOCKET_BIND_PORT);
}
bootstrap();
