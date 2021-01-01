# Bank Scheduling Server

## Description

A sample bank scheduling server written in nodejs and nest framework

## Roles

- clients terminal
  - clients can request a new recepit by clicking new receipt button
    - receipt contains approximate waiting time and number of clients in queue
  - they would be called when it's their turn in scheuling system
- employee
  - new employees can join the employees queue at any time
  - each employee has a terminal
    - employee can leave at any time
    - employee can request new client


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
