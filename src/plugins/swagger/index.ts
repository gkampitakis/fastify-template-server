import { FastifyError, FastifyInstance, FastifyRegisterOptions } from 'fastify';
import fp from 'fastify-plugin';
import fastifySwagger from 'fastify-swagger';
import _package from '../../../package.json';

function swaggerGenerator (fastify: FastifyInstance, opts: FastifyRegisterOptions<unknown>, done: (err?: FastifyError) => void) {
  fastify.register(fastifySwagger, {
    routePrefix: '/docs',
    swagger: {
      consumes: ['application/json'],
      info: {
        title: 'Fastify template server',
        version: _package.version,
        description: _package.description
      }
    },
    exposeRoute: !fastify.isProduction
  });

  done();
}

export default fp(swaggerGenerator, {
  name: 'swagger-generator'
});
