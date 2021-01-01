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
- /started `{ id: number }`
  - server informs terminal about associated id immediately after /start

Employee-specific messages:
- /call-customer
  - called when current customers's job is done and employee is free to accept new custoemrs

Customer-specific messages:
- /ticket `{ id: number, positionInQueue: number, waitingCustomers: number, activeEmployees: number, approximateWaitingTime: number }`
  - sent by server immediately after customer sent `/start`
- /turn `{ employeeId: number, employeeName: string }`
  - sent by server when an employee sent /call-customer and it's customer's turn in queue

Server-terminal-specific messages:
- /update `{ customers: {id: number, name: string, isProcessed: boolean}[], employees: {id:number, name: string}[], waitingTime: number }`
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
