import { FastifyReply, FastifyRequest } from 'fastify';

class Controller {
  public defaultRoute (req: FastifyRequest, res: FastifyReply) {
    res.send('Hello World From template');
  }

  public helloRoute (req: FastifyRequest, res: FastifyReply) {
    res.send(`Hello Mr ${req.params['name']}`)
  }
}

export default Controller;