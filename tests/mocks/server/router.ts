import { request } from './req';
import { response } from './res';
class Router {
  public middlewareSet = new Set<{ path: string, callback:(req, res) => {}}>();
  public get = jest.fn((path: string, callback) => {
    this.middlewareSet.add({path, callback})
  });
  run(realPath: string) {
    this.middlewareSet.forEach(({ path, callback }) => {
      const start = path.indexOf(':');
      let end = path.indexOf('/', start);
      if (end === -1) end = path.length; 
      const key = path.substring(start + 1, end);
      let realPathEnd = path.indexOf('/', start);
      if (realPathEnd === -1) realPathEnd = realPath.length;
      request.params[key] = realPath.substring(start, realPathEnd);
      callback(request, response);
    });
  }
}

const router = new Router();

function createRouter() {
  return router;
}

export {
  router,
  createRouter,
}