import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

export default {
  server: {
    port: parseInt(process.env.PORT || '4000')
  },
  isProduction,
  cors: {
    origin: false
  },
  healthCheck: {
    exposeFailure: true,
    info: { Service: 'Template' },
    path: '/api/health'
  },
  shutdownDelay: 5000
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