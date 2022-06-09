import pino from 'pino';
import { logger as config } from './config';

export const logger = pino(config);
