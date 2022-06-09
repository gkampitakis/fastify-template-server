import dotenv from 'dotenv';
import { P } from 'pino';

const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

if (!isProduction) {
  dotenv.config();
}

export const config = {
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
  }
};

export const logger: P.LoggerOptions = {
  level: isProduction ? 'info' : 'debug', //Other supported "trace","debug","info","warn","error","fatal" in this order
  base: {
    name: process.env.SERVICE
  },
  enabled: !isTest,
  ...(!isProduction && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        ignore: 'hostname,pid',
        translateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss",
        levelFirst: true
      }
    }
  })
};
