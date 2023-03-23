jest.mock('electron', () => require('./mocks/electron'));

const showWindow = jest.fn();

jest.mock('../src/window', () => ({ showWindow }));

import { app } from 'electron';

import '../src/app';
import { CacheKey } from '../src/constant';
import { cache } from '../src/lib/cache';

describe('run', () => {
  it('second-instance()', () => {
    app.emit('second-instance');
    expect(showWindow).toHaveBeenCalled();
  });

  it('before-quit', () => {
    const server = {
      close: jest.fn()
    };
    cache.set(CacheKey.HTTP_SERVER, server);
    app.emit('before-quit');
    expect(server.close).toHaveBeenCalled();
  });

  it('activate', () => {
    app.emit('activate');
    expect(showWindow).toHaveBeenCalled();
  });
});