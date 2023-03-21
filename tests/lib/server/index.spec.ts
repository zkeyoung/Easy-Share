import { createApplication, express } from '../../mocks/server/app';
import { httpServer } from '../../mocks/server/http';
jest.mock('../../../src/lib/server/app', () => createApplication());

import server from '../../../src/lib/server';


describe('start()', () => {
  it('success', async () => {
    const liveServer = await server.start({ port: 8000 });
    expect(express.listen).toHaveBeenCalled();
    expect(liveServer).toBeTruthy();
  });

  it('should return null', () => {
    const error: NodeJS.ErrnoException = {
      syscall: 'listen',
      code: 'EADDRINUSE',
      message: 'EADDRINUSE',
      name: 'EADDRINUSE',
    };
    expect(server.start({ port: 8000 })).resolves.toBeNull();
    httpServer.emit('error', error);
  });

  it('should reject promise', () => {
    const error: NodeJS.ErrnoException = {
      syscall: 'listen',
      code: 'other',
      message: 'other',
      name: 'other',
    };
    expect(server.start({ port: 8000 })).rejects.toBe(error);
    httpServer.emit('error', error);
  });

  it('should reject promise rather than listen syscall', () => {
    const error: NodeJS.ErrnoException = {
      code: 'other',
      message: 'other',
      name: 'other',
    };
    expect(server.start({ port: 8000 })).rejects.toBe(error);
    httpServer.emit('error', error);
  });
});