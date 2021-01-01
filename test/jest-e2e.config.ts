import type { Config } from '@jest/types';
import { resolve } from 'path';

const config: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  verbose: true,

  moduleNameMapper: {
    '^~/(.*)$': resolve(__dirname, '../src/$1'),
  },
};

export default config;
