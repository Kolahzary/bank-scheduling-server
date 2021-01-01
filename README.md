# Bank Scheduling Server

## Description

A sample bank scheduling server written in nodejs and nest framework

## User Roles

- server terminal
  - displays updates about current state of system
- customer
  - receives a ticket which includes stats like position in queue and approximate waiting time
- employee
  - can process client requests call new customers

## Message Types

All connections to the server is made through socket.io, following messages are supported:

Universal messages:
- /start `{ name: string, role: 'customer' | 'employee' | 'server' }`
  - all terminals should introduce themselves before doing anything else

Employee-specific messages:
- /started `{ id: number }`
  - server informs employee terminal about it's id immediately after /start
- /call-customer
  - called when current customers's job is done and employee is free to accept new custoemrs

Customer-specific messages:
- /ticket `{ id: number, positionInQueue: number, waitingCustomers: number, activeEmployees: number, approximateWaitingTime: number }`
  - sent by server immediately after customer sent `/start`

Server-terminal messages:
- /update `{ customers: {id: number, name: string}[], employees: {id:number, name: string}[], waitingTime: number }`
  - sent by server everytime data is changed


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

This project is [MIT licensed](LICENSE).
