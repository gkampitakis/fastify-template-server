import Server from './server';
import customHealthCheck from 'fastify-custom-healthcheck';
import cors from 'fastify-cors';

jest.mock('fastify');
jest.mock('./utils/logger');
jest.mock('./utils/config', () => ({
  healthCheck: 'mockConfig',
  cors: 'mockConfig',
  server: {
    port: 4000
  }
}));
jest.mock('./routes');

describe('Server', () => {
  const { constructorSpy,
    registerSpy,
    addHealthChecksSpy,
    listenSpy,
    settings } = jest.requireMock('fastify'),
    { infoSpy } = jest.requireMock('./utils/logger'),
    { registerRoutesSpy } = jest.requireMock('./routes');

  beforeEach(() => {
    infoSpy.mockClear();
    constructorSpy.mockClear();
    registerSpy.mockClear();
    addHealthChecksSpy.mockClear();
    listenSpy.mockClear();
    registerRoutesSpy.mockClear();
    settings.registerCounter = 0;
  });

  describe('When instantiate server', () => {
    it('Should instantiate fastify', () => {
      new Server();

      expect(constructorSpy).toHaveBeenCalled();
    });

    describe('When register plugins', () => {
      it('Should register custom health checks', () => {
        new Server();

        expect(registerSpy).toHaveBeenCalledWith(customHealthCheck, 'mockConfig');
      });

      it('Should register cors', () => {
        new Server();

        expect(registerSpy).toHaveBeenCalledWith(cors, 'mockConfig');
      });
      //NOTE: keep adding plugin tests
    });

    it('Should add health checks', (done) => {
      new Server();

      setTimeout(() => {
        expect(addHealthChecksSpy).toHaveBeenCalledTimes(1);
        expect(addHealthChecksSpy).toHaveBeenCalledWith('templateCheck', expect.any(Function));

        //NOTE: keep adding health checks

        done();
      });
    });

    it('Should register routes', () => {
      new Server();

      expect(registerSpy).toHaveBeenCalledTimes(3);
      expect(registerSpy.mock.calls[0][0]).toEqual(expect.any(Function));
    });
  });

  describe('When call start method', () => {
    it('Should call server listen', async () => {
      await new Server().start();

      expect(listenSpy).toHaveBeenCalledWith(4000, '0.0.0.0');
      expect(infoSpy).toHaveBeenCalledWith('🚀 Server started on port 4000');
    });
  });
});