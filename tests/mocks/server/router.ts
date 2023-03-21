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
      const end = path.indexOf('/', start) || path.length;
      const key = path.substring(start + 1, end);
      const realPathEnd = path.indexOf('/', start) || realPath.length;
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