import { FastifyError, FastifyInstance } from 'fastify';
import templateRoutes from './template';

export default (fastify: FastifyInstance, options: unknown, done: (err?: FastifyError) => void): void => {
  fastify.register(templateRoutes, { prefix: '/template' });

  done();
};