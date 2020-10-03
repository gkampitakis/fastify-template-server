import dotenv from 'dotenv';

dotenv.config({
  path: process.cwd() + `/.env.${process.env.NODE_ENV}`
});

const isProduction = process.env.NODE_ENV === 'prd';

export default {
  server: {
    port: parseInt(process.env.PORT)
  },
  isProduction,
  logger: {
    level: isProduction ? 'warn' : 'debug',
    prettyPrint: !isProduction,
    name: process.env.SERVICE
  },
  cors: {
    origin: '*'
  },
  healthCheck: {
    exposeFailure: true,
    info: { Service: 'Template' },
    path: '/api/health'
  }
};

export const logger = {
  level: isProduction ? 'info' : 'debug', //Other supported "trace","debug","info","warn","error","fatal" in this order
  base: {
    name: 'Template'
  },
  prettyPrint: isProduction ? false : {
    colorize: true,
    ignore: 'hostname,pid',
    translateTime: 'UTC:yyyy-mm-dd\'T\'HH:MM:ss',
    levelFirst: true
  }
};