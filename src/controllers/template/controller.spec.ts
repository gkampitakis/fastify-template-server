import Controller from './controller';

describe('Template Controller', () => {

  const sendSpy = jest.fn(),
    request: any = {
      params: {
        name: 'mock'
      }
    },
    response: any = {
      send: sendSpy
    };

  beforeEach(() => {
    sendSpy.mockClear();
  });

  it('defaultRoute', () => {
    const controller = new Controller();

    controller.defaultRoute(request, response);
    expect(sendSpy).toHaveBeenNthCalledWith(1,'Hello World From template');
  });

  it('helloRoute', () => {
    const controller = new Controller();

    controller.helloRoute(request, response);
    expect(sendSpy).toHaveBeenNthCalledWith(1,'Hello Mr mock');
  });
});