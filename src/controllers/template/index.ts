import { FastifyInstance } from 'fastify';
import Controller from './controller';

function templateRoute (prefix: string) {

  return function (server: FastifyInstance, options?: unknown) {

    const controller = new Controller();

    server.get(`${prefix}`, (req, res) => controller.defaultRoute(req, res));
    server.get(`${prefix}/hello/:name`, (req, res) => controller.helloRoute(req, res));
  }
}

export default templateRoute;