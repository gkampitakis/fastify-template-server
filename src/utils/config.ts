import dotenv from 'dotenv';
import { LoggerOptions } from 'pino';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

export default {
  server: {
    port: parseInt(process.env.PORT || '4000')
  },
  isProduction,
  cors: {
    origin: false
  },
  healthCheck: {
    exposeFailure: !isProduction,
    info: { Service: process.env.SERVICE || '' },
    path: '/api/health'
  },
  shutdownDelay: 5000
};

export const logger: LoggerOptions = {
  level: isProduction ? 'warn' : 'debug', //Other supported "trace","debug","info","warn","error","fatal" in this order
  base: {
    name: process.env.SERVICE
  },
  enabled: !isTest,
  prettyPrint: isProduction ? false : {
    colorize: true,
    ignore: 'hostname,pid',
    translateTime: 'UTC:yyyy-mm-dd\'T\'HH:MM:ss',
    levelFirst: true
  }
};