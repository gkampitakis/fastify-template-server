describe('Configuration', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env.SERVICE = 'test service';
  });

  describe('Production config', () => {
    it('Default config', async () => {
      process.env.NODE_ENV = 'production';
      process.env.SERVICE = '';
      const { config } = await import('./config');

      expect(config).toMatchSnapshot();
    });

    it('Logger', async () => {
      process.env.NODE_ENV = 'production';

      const { logger } = await import('./config');

      expect(logger).toMatchSnapshot();
    });
  });

  describe('Development config', () => {
    it('Default config', async () => {
      process.env.NODE_ENV = 'dev';
      const { config } = await import('./config');

      expect(config).toMatchSnapshot();
    });

    it('Logger', async () => {
      process.env.NODE_ENV = 'dev';

      const { logger } = await import('./config');

      expect(logger).toMatchSnapshot();
    });
  });
});
