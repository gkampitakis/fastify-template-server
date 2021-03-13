import { defaultRoute, helloRoute } from './controller';

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
    defaultRoute(request, response);
    expect(sendSpy).toHaveBeenNthCalledWith(1, 'Hello World From template');
  });

  it('helloRoute', () => {
    helloRoute(request, response);
    expect(sendSpy).toHaveBeenNthCalledWith(1, 'Hello Mr mock');
  });
});