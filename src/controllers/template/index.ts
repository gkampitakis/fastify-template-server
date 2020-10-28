import { FastifyError, FastifyInstance, FastifyRequest } from 'fastify';
import Controller from './controller';

export default (fastify: FastifyInstance, options: unknown, done: (err?: FastifyError) => void): void => {
  fastify.get('/', (req, res) => Controller.defaultRoute(req, res));
  fastify.get('/hello/:name', (req: FastifyRequest<{ Params: { name: string } }>, res) => Controller.helloRoute(req, res));

  done();
};