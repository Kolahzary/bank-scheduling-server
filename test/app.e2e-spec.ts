import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { createSocketClientAsync, startSocket } from './helpers';
import { ClientSocket, StartedMessage } from '~/interfaces';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  
  afterEach(() => {
    app.close()
  })

  xit('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('Server terminal connected', () => {
    let serverTerminal: ClientSocket;

    beforeEach(async () => {
      serverTerminal = await createSocketClientAsync();
    });

    afterEach(() => {
      serverTerminal.close();
    })

    it('should exist', () => {
      expect(serverTerminal).toBeTruthy();
    })

    it('should be connected', () => {
      expect(serverTerminal.connected).toEqual(true);
    })

    describe('Server terminal sent /start', () => {
    let serverTerminalStartedMessage: StartedMessage;

      beforeEach(async () => {
        serverTerminalStartedMessage = await startSocket(serverTerminal, {
          name: 'test-server-terminal',
          role: 'server'
        })
      })

      it('should have id==1', () => {
        expect(serverTerminalStartedMessage.id).toEqual(1);
      })
    })
  })
});
