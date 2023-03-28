import type http from 'node:http';
import app from './app';

async function start({ port }: { port: number }): Promise<http.Server | null> {
  return new Promise((reslove, reject) => {
    const server = app.listen(port, () => {
      reslove(server);
    });
    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.syscall !== 'listen') return reject(error);
      if (error.code === 'EADDRINUSE') return reslove(null);
      reject(error);
    });
  });
}

export default {
  start,
}