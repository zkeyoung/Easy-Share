import { EventEmitter } from 'events';
import { http } from './http';
import { response } from './res';
import { router } from './router';
class AppMock extends EventEmitter {

  public middlewareSet = new Set<(req, res) => {}>();

  public listen = jest.fn((port, callback) => {
    return http.createServer(port, callback);
  });
  
  public use = jest.fn(middleware => {
    this.middlewareSet.add(middleware);
  });
}

class ExpressMock extends AppMock {
  run() {
    this.middlewareSet.forEach(middleware => {
      middleware(null, response);
    });
  }
}

const express = new ExpressMock();
function createApplication() {
  return express;
}

export {
  express,
  createApplication,
}

export default {
  Router: router,
}