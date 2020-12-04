import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

function pushRoute (fastify: FastifyInstance, req: FastifyRequest<{ Body: { payload: unknown } }>, res: FastifyReply): void {
  fastify.kafka.push({
    topic: 'message',
    payload: JSON.stringify(req.body.payload),
    key: null,
    partition: null
  });

  res.send({ message: 'Message was successfully processed' });
}

export default {
  pushRoute
};

//TODO: add libraries for node rfkafka docker
