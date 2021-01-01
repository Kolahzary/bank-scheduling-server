import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { createSocketClientAsync, getTicketMessageAsync, startSocket } from './helpers';
import { ClientSocket, StartedMessage, TicketMessage, UpdateMessage } from '~/interfaces';
import { getUpdateMessageAsync } from './helpers/socket/get-update-message';
import { getTurnMessageAsync } from './helpers/socket/get-turn-message';

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
    let lastServerUpdate: UpdateMessage;

      beforeEach(async () => {
        serverTerminal.on('/update', (message) => {
          lastServerUpdate = message
        });

        serverTerminalStartedMessage = await startSocket(serverTerminal, {
          name: 'test-server-terminal',
          role: 'server'
        });
      })

      it('should have id==0', () => {
        expect(serverTerminalStartedMessage.id).toEqual(0);
      })


      describe('Employee 0', () => {
        let employee0: ClientSocket;

        beforeEach(async () => {
          employee0 = await createSocketClientAsync();
        });

        afterEach(() => {
          employee0?.close();
        })

        it('should be connected', () => {
          expect(employee0).toBeTruthy();
          expect(employee0.connected).toEqual(true);
        })

        describe('=> Employee 0 sent /start', () => {
          let employee0StartedMessage: StartedMessage;

          beforeEach(async () => {
            employee0StartedMessage = await startSocket(employee0, {
              name: 'test-employee-0',
              role: 'employee'
            })
          })

          it('should have id==0', () => {
            expect(employee0StartedMessage.id).toEqual(0);
          })

          it('should emit /update on server terminal', async () => {
            const message = await getUpdateMessageAsync(serverTerminal)
            expect(message).toBeTruthy()
            expect(message.employees).toBeTruthy()
            expect(message.employees.length).toEqual(1)
            expect(message.employees[0].name).toEqual('test-employee-0')
          })

          describe('Employee 1', () => {
            let employee1: ClientSocket;

            beforeEach(async () => {
              employee1 = await createSocketClientAsync();
            });

            afterEach(() => {
              employee1?.close();
            })

            it('should be connected', () => {
              expect(employee1).toBeTruthy();
              expect(employee1.connected).toEqual(true);
            })

            describe('=> Employee 1 sent /start', () => {
            let employee1StartedMessage: StartedMessage;

              beforeEach(async () => {
                employee1StartedMessage = await startSocket(employee1, {
                  name: 'test-employee-1',
                  role: 'employee'
                })
              })

              it('should have id==1', () => {
                expect(employee1StartedMessage.id).toEqual(1);
              })

              it('should emit /update on server terminal', async () => {
                const message = await getUpdateMessageAsync(serverTerminal)
                expect(message).toBeTruthy()
                expect(message.employees).toBeTruthy()
                expect(message.employees.length).toEqual(2)
                expect(message.employees[1].name).toEqual('test-employee-1')
              })

              describe('Customer 0', () => {
                let customer0: ClientSocket;

                beforeEach(async () => {
                  customer0 = await createSocketClientAsync();
                });

                afterEach(() => {
                  customer0?.close();
                })

                it('should be connected', () => {
                  expect(customer0).toBeTruthy();
                  expect(customer0.connected).toEqual(true);
                })

                describe('=> Customer 0 sent /start', () => {
                let customer0StartedMessage: StartedMessage;
                let customer0TicketPromise: Promise<TicketMessage>

                  beforeEach(async () => {
                    customer0TicketPromise = getTicketMessageAsync(customer0)
                    customer0StartedMessage = await startSocket(customer0, {
                      name: 'test-customer-0',
                      role: 'customer'
                    })
                  })

                  it('should have id==0', () => {
                    expect(customer0StartedMessage.id).toEqual(0);
                  })

                  it('should emit /update on server terminal', async () => {
                    const message = await getUpdateMessageAsync(serverTerminal)
                    expect(message).toBeTruthy()
                    expect(message.customers).toBeTruthy()
                    expect(message.customers.length).toEqual(1)
                    expect(message.customers[0].name).toEqual('test-customer-0')
                  })

                  it('should emit /turn if employee1 sends /call-customer', async () => {
                    const turnMessagePromise = getTurnMessageAsync(customer0)
                    employee1.emit('/call-customer')
                    
                    const turnMessage = await turnMessagePromise;
                    
                    expect(turnMessage).toBeTruthy()
                  });

                  it('should receive /ticket', async () => {
                    const message = await customer0TicketPromise

                    expect(message).toBeTruthy()
                  })
                })
              })
            })
          })

        })
      })

    })
  })

});
