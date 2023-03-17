import Settings from '../../src/entity/settings';

const SERVER_INTERNAL = {};
class Server {

  #internal;
  // app
  start = jest.fn((settings: Settings) => {
    if (this.#internal[settings.port]) {
      return Promise.resolve(undefined);
    }
    return Promise.resolve(this);
  });

  close = jest.fn();

  constructor(internal) {
    this.#internal = internal;
  }
}

const server = new Server(SERVER_INTERNAL);


export {
  SERVER_INTERNAL,
  server,
}