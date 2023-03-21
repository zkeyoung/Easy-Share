import { EventEmitter } from 'events';

class HttpServerMock extends EventEmitter {

}

const httpServer = new HttpServerMock();

class HttpMock {
  public createServer = jest.fn((port, callback) => {
    process.nextTick(callback);
    return httpServer;
  });
}

const http = new HttpMock();

export {
  httpServer,
  http,
}