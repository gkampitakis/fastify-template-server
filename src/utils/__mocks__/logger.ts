export default {
  info (...args) {
    infoSpy(...args);
  }
}

const infoSpy = jest.fn();

export {
  infoSpy
}