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

  describe('Server terminal', () => {
    let serverTerminal: ClientSocket;

    beforeEach(async () => {
      serverTerminal = await createSocketClientAsync();
    });

    afterEach(() => {
      serverTerminal?.close();
    })

    it('should be connected', () => {
      expect(serverTerminal).toBeTruthy();

      expect(serverTerminal.connected).toEqual(true);
    })

    describe('=> Server terminal sent /start', () => {
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


      describe('Employee 1', () => {
        let employee1Terminal: ClientSocket;

        beforeEach(async () => {
          employee1Terminal = await createSocketClientAsync();
        });

        afterEach(() => {
          employee1Terminal?.close();
        })

        it('should be connected', () => {
          expect(employee1Terminal).toBeTruthy();
          expect(employee1Terminal.connected).toEqual(true);
        })

        describe('=> Employee 1 sent /start', () => {
        let employee1StartedMessage: StartedMessage;

          beforeEach(async () => {
            employee1StartedMessage = await startSocket(employee1Terminal, {
              name: 'test-employee-1',
              role: 'employee'
            })
          })

          it('should have id==1', () => {
            expect(employee1StartedMessage.id).toEqual(1);
          })


          describe('Employee 2', () => {
            let employee2Terminal: ClientSocket;

            beforeEach(async () => {
              employee2Terminal = await createSocketClientAsync();
            });

            afterEach(() => {
              employee2Terminal?.close();
            })

            it('should be connected', () => {
              expect(employee2Terminal).toBeTruthy();
              expect(employee2Terminal.connected).toEqual(true);
            })

            describe('=> Employee 2 sent /start', () => {
            let employee2StartedMessage: StartedMessage;

              beforeEach(async () => {
                employee2StartedMessage = await startSocket(employee2Terminal, {
                  name: 'test-employee-1',
                  role: 'employee'
                })
              })

              it('should have id==2', () => {
                expect(employee2StartedMessage.id).toEqual(2);
              })

            })
          })

        })
      })

    })
  })

});
