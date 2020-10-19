const settings = {
  registerCounter: 0
};

export default function fastify () {

  constructorSpy();
  return {
    register (...args) {
      settings.registerCounter++;

      registerSpy(...args);

      if (settings.registerCounter > 2) {
        return Promise.resolve(this);
      }

      return this;
    },
    addHealthCheck (...args) {
      args[1]();
      addHealthChecksSpy(...args);
    },
    listen (...args) {
      listenSpy(...args);

      return Promise.resolve(this);
    }
  }
}

const constructorSpy = jest.fn(),
  registerSpy = jest.fn(),
  addHealthChecksSpy = jest.fn(),
  listenSpy = jest.fn();

export {
  constructorSpy,
  registerSpy,
  addHealthChecksSpy,
  listenSpy,
  settings
};