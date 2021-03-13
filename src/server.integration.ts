import ServerInstance from './server';
import request from 'supertest';
import { Server } from 'http';
import { FastifyInstance } from 'fastify';

let httpServer: Server;
let fastify: FastifyInstance;

describe('Server', () => {
  beforeEach(() => {
    jest.resetModules();
    // process.env.NODE_ENV = 'test';
  });

  beforeAll(async () => {
    const { fastify: fastify } = new ServerInstance();
    await fastify.ready();

    httpServer = fastify.server;
  });

  afterAll(async () => {
    await fastify.close();
  });

  it('Should register health check plugin', async () => {
    const response = await request(httpServer)
      .get('/api/health')
      .expect('Content-Type', /json/)
      .expect(200)
      .send();

    expect(response.body).toEqual({
      healthChecks: {
        templateCheck: 'HEALTHY'
      },
      stats: expect.any(Object),
      info: { Service: 'Template' }
    });
  });

  it('Should expose swagger docs', async () => {
    await request(httpServer)
      .get('/docs')
      .expect(302);
  });

  it('Should not expose swagger docs', async () => {
    // With this way, we force to load the new env.
    process.env.NODE_ENV = 'production';
    const ServerInstance = require('./server').default;
    const { fastify } = new ServerInstance();
    await fastify.ready();

    await request(fastify.server)
      .get('/docs')
      .expect(404)
      .send();

    await fastify.close();
  });

  describe('Template', () => {
    it('Should call default Route', async () => {
      const response = await request(httpServer)
        .get('/template')
        .expect('Content-Type', /text/)
        .expect(200)
        .send();

      expect(response.text).toBe('Hello World From template');
    });

    it('Should call hello Route', async () => {
      const response = await request(httpServer)
        .get('/template/hello/test')
        .expect('Content-Type', /text/)
        .expect(200)
        .send();

      expect(response.text).toBe('Hello Mr test');
    });
  });
});