import { FastifyError, FastifyInstance } from 'fastify';
import { defaultSchema, helloSchema } from './template.schema';
import { defaultRoute, helloRoute } from './controller';

export default (fastify: FastifyInstance, options: unknown, done: (err?: FastifyError) => void): void => {
  fastify.addHook('preValidation', fastify.authorize);
  /*
  * NOTE: here using preValidation as onRequest is too early and in Fastify Hooks the session is created in preValidation
  **/

  fastify.get('/', { schema: defaultSchema }, defaultRoute);
  fastify.get('/hello/:name', { schema: helloSchema }, helloRoute);

  done();
};