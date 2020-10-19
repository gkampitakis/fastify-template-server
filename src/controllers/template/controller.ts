import { FastifyReply, FastifyRequest } from 'fastify';

function defaultRoute (req: FastifyRequest, res: FastifyReply) {
  res.send('Hello World From template');
}

function helloRoute (req: FastifyRequest<{ Params: { name: string } }>, res: FastifyReply) {
  res.send(`Hello Mr ${req.params.name}`)
}

export default {
  defaultRoute,
  helloRoute
};