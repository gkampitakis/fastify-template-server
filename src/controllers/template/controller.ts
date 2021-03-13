import { FastifyReply, FastifyRequest } from 'fastify';

export function defaultRoute (req: FastifyRequest, res: FastifyReply): void {
  res.send('Hello World From template');
}

export function helloRoute (req: FastifyRequest<{ Params: { name: string } }>, res: FastifyReply): void {
  res.send(`Hello Mr ${req.params.name}`);
}
