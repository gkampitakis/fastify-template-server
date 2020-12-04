import { FastifyError, FastifyInstance, FastifyRequest } from 'fastify';
import { pushMessage } from './message.schema';
import Controller from './controller';

export default (fastify: FastifyInstance, options: unknown, done: (err?: FastifyError) => void): void => {
  fastify.post('/', (req: FastifyRequest<{ Body: { payload: unknown } }>, res) => Controller.pushRoute(fastify, req, res));

  done();
};