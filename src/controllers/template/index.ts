import { FastifyError, FastifyInstance } from 'fastify';
import { defaultSchema, helloSchema } from './template.schema';
import { defaultRoute, helloRoute } from './controller';

export default (
  fastify: FastifyInstance,
  options: unknown,
  done: (err?: FastifyError) => void
): void => {
  fastify.get('/', { schema: defaultSchema }, defaultRoute);
  fastify.get('/hello/:name', { schema: helloSchema }, helloRoute);

  done();
};
