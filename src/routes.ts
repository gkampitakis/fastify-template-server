import { FastifyInstance } from 'fastify';
import Routes from './controllers';

export default (server: FastifyInstance, options?: unknown): void => {
  for (const register of Object.values(Routes)) {
    register(server, options);
  }
};