import ServerInstance from './server';
import { FastifyInstance } from 'fastify';

let fastify: FastifyInstance;

describe('Server', () => {
  beforeEach(() => {
    jest.resetModules();
    // process.env.NODE_ENV = 'test';
  });

  beforeAll(async () => {
    fastify = new ServerInstance().fastify;
    await fastify.ready();
  });

  afterAll(async () => {
    await fastify.close();
  });

  it('Should register health check plugin', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/api/health'
    });

    expect(JSON.parse(response.body)).toEqual({
      healthChecks: {
        templateCheck: 'HEALTHY'
      },
      stats: expect.any(Object),
      info: { Service: 'test service' }
    });
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
  });

  it('Should expose swagger docs', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/docs'
    });

    expect(response.statusCode).toBe(302);
  });

  it('Should not expose swagger docs', async () => {
    // With this way, we force to load the new env.
    process.env.NODE_ENV = 'production';
    const ServerInstance = require('./server').default;
    const { fastify } = new ServerInstance();
    await fastify.ready();

    const response = await fastify.inject({
      method: 'GET',
      url: '/docs'
    });

    expect(response.statusCode).toBe(404);

    await fastify.close();
  });

  describe('Template', () => {
    it('Should call default Route', async () => {
      const response = await fastify.inject({
        method: 'GET',
        url: '/template'
      });

      expect(response.body).toBe('Hello World From template');
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toMatch(/text/);
    });

    it('Should call hello Route', async () => {
      const response = await fastify.inject({
        method: 'GET',
        url: '/template/hello/test'
      });

      expect(response.body).toBe('Hello Mr test');
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toMatch(/text/);
    });
  });
});