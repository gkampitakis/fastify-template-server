import { FastifyReply, FastifyRequest } from 'fastify';

export function defaultRoute(req: FastifyRequest, reply: FastifyReply) {
  reply.send('Hello World From template');
}

export function helloRoute(
  req: FastifyRequest<{ Params: { name: string } }>,
  reply: FastifyReply
) {
  reply.send(`Hello Mr ${req.params.name}`);
}
