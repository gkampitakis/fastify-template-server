import { FastifyError, FastifyInstance } from 'fastify';
import templateRoutes from './template';
import authRoutes from './auth';

export default (fastify: FastifyInstance, options: unknown, done: (err?: FastifyError) => void): void => {
  fastify.register(templateRoutes, { prefix: '/template' });
  fastify.register(authRoutes, { prefix: '/auth' });

  done();
};