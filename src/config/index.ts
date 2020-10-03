import dotenv from 'dotenv';

dotenv.config({
  path: process.cwd() + `/.env.${process.env.NODE_ENV}`
});

export default {
  server: {
    port: parseInt(process.env.PORT)
  },
  environment: process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === 'prd',
  logger: {
    level: process.env.NODE_ENV === 'prd' ? 'warn' : 'debug',
    prettyPrint: process.env.NODE_ENV !== 'prd',
    name: process.env.SERVICE
  },
  cors: {
    origin: "*"
  },
  healthCheck: {
    exposeFailure: true,
    info: { Service: 'Template' },
    path: '/api/health'
  }
};

export const logger = {
  level: process.env.NODE_ENV === 'prod' ? 'info' : 'debug', //Other supported "trace","debug","info","warn","error","fatal" in this order
  base: {
    name: 'Template'
  },
  prettyPrint: process.env.NODE_ENV === 'prod' ? false : {
    colorize: true,
    ignore: 'hostname,pid',
    translateTime: 'UTC:yyyy-mm-dd\'T\'HH:MM:ss',
    levelFirst: true
  }
};