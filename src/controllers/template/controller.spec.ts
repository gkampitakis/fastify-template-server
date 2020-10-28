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
    Controller.defaultRoute(request, response);
    expect(sendSpy).toHaveBeenNthCalledWith(1, 'Hello World From template');
  });

  it('helloRoute', () => {
    Controller.helloRoute(request, response);
    expect(sendSpy).toHaveBeenNthCalledWith(1, 'Hello Mr mock');
  });
});