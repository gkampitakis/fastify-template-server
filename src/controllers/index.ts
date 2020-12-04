import { FastifyError, FastifyInstance } from 'fastify';
import templateRoutes from './template';
import messageRoutes from './message';

export default (fastify: FastifyInstance, options: unknown, done: (err?: FastifyError) => void): void => {
  fastify.register(templateRoutes, { prefix: '/template' });
  fastify.register(messageRoutes, { prefix: '/message' });

  done();
};