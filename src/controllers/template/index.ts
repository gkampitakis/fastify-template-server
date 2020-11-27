import { FastifyError, FastifyInstance } from 'fastify';
import { defaultSchema, helloSchema } from './template.schema';
import Controller from './controller';

export default (fastify: FastifyInstance, options: unknown, done: (err?: FastifyError) => void): void => {
  fastify.get('/', { schema: defaultSchema }, Controller.defaultRoute);
  fastify.get('/hello/:name', { schema: helloSchema }, Controller.helloRoute);

  done();
};