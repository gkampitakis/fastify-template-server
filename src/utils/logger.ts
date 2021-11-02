import pino from 'pino';
import { logger } from './config';

const pinoLogger = pino(logger);

export default pinoLogger;
