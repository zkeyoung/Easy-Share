jest.mock('electron', () => require('./mocks/electron'));

import { CacheKey } from './../src/constant/index';
import { BrowserWindowMock as BrowserWindow } from './mocks/browser-window';
import { createWindow, destoryWindow, getWindow, showWindow } from '../src/window';
import { cache } from '../src/lib/cache';
import File from '../src/entity/file';
import Settings from '../src/entity/settings';
import { pagePath } from '../src/lib/path';

beforeEach(() => {
  cache.clear();
});

describe('getWindow()', () => {
  it('should return BrowserWindow', () => {
    const bw = new BrowserWindow();
    cache.set(CacheKey.MAIN_WINDOW, bw);
    expect(getWindow()).toBe(bw);
  });

  it('should return undefined', () => {
    expect(getWindow()).toBe(undefined);
  });
});

describe('destoryWindow()', () => {
  it('success', () => {
    const bw = new BrowserWindow();
    cache.set(CacheKey.MAIN_WINDOW, bw);
    cache.set('abcdef', new File());
    cache.set(CacheKey.SETTINGS, new Settings());
    destoryWindow();
    expect(cache.get(CacheKey.SETTINGS)).toBeTruthy();
    expect(cache.get(CacheKey.MAIN_WINDOW)).toBeFalsy();
    expect(cache.get('abcdef')).toBeFalsy();
  });
});

describe('createWindow()', () => {
  it('should return new window', async () => {
    createWindow().then((window) => {
      expect(cache.get(CacheKey.MAIN_WINDOW)).toBe(window);
      expect(window.show).toHaveBeenCalled();
      window.emit('closed');
      expect(cache.get(CacheKey.MAIN_WINDOW)).toBeUndefined();
    });
    const window: BrowserWindow = cache.get(CacheKey.MAIN_WINDOW);
    expect(window).toBeTruthy();
    expect(window.loadFile).toHaveBeenCalled();
    window.emit('ready-to-show');
  });

  it('should return new window win32', () => {
    Object.defineProperty(process, 'platform', {  
      value: 'win32'
    });
    cache.set(CacheKey.SETTINGS, new Settings());
    createWindow();
    const window: BrowserWindow = cache.get(CacheKey.MAIN_WINDOW);
    expect(window).toBeTruthy();
    expect(window.loadFile).toHaveBeenCalledWith(pagePath, { hash: '' });
  });
});

describe('showWindow()', () => {
  it('should create window', () => {
    BrowserWindow.getAllWindows.mockReturnValueOnce({ length: 0 });
    showWindow();
    const window = cache.get(CacheKey.MAIN_WINDOW);
    expect(window).toBeTruthy();
    window.emit('ready-to-show');
  });

  it('should restore window', () => {
    BrowserWindow.getAllWindows.mockReturnValueOnce({ length: 1 });
    const bw = new BrowserWindow();
    cache.set(CacheKey.MAIN_WINDOW, bw);
    bw.isMinimized.mockReturnValueOnce(true);
    showWindow();
    expect(bw.restore).toHaveBeenCalled();
  });

  it('should focus window', () => {
    BrowserWindow.getAllWindows.mockReturnValueOnce({ length: 1 });
    const bw = new BrowserWindow();
    cache.set(CacheKey.MAIN_WINDOW, bw);
    showWindow();
    expect(bw.focus).toHaveBeenCalled();
  });
});