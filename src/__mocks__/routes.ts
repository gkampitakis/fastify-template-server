export const registerRoutesSpy = jest.fn();

export default function (...args) {
  registerRoutesSpy(...args);
}
