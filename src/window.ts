import { BrowserWindow, app } from 'electron';
import path from 'node:path';
import { CacheKey } from './constant';
import { cache } from './lib/cache';
import { pagePath } from './lib/path';

function createWindow() {
  return new Promise((resolve) => {
    const cachedWindow = getWindow();
    if (cachedWindow) return resolve(cachedWindow);

    const bwOption: Electron.BrowserWindowConstructorOptions = {
      height: 300,
      width: 280,
      resizable: false,
      webPreferences: {
        preload: path.resolve(__dirname, './preload.js'),
      },
    }
    if (process.platform === 'win32') {
      bwOption.height = 320;
      bwOption.icon = path.resolve(__dirname, '../static/logo.ico');
    }
    const window = new BrowserWindow(bwOption);
    window.loadFile(pagePath, { hash: cache.get(CacheKey.SETTINGS) ? '' : '#/settings' });
    // window.loadURL('http://localhost:5173/');
    window.once('ready-to-show', () => {
      resolve(window);
      window.show();
    });
    window.on('closed', () => {
      destoryWindow();
      app.quit();
    });
    cache.set(CacheKey.MAIN_WINDOW, window);
  });
}

function getWindow(): BrowserWindow {
  return cache.get(CacheKey.MAIN_WINDOW);
}

function destoryWindow() {
  const window = getWindow();
  if (window) {
    if (!window.isDestroyed()) {
      window.destroy();
    }
    cache.delete(CacheKey.MAIN_WINDOW);
  }
  for (const key of cache.keys()) {
    if (!CacheKey[key]) cache.delete(key);
  }
}

function showWindow() {
  if (BrowserWindow.getAllWindows().length === 0) {
    return createWindow();
  }
  const window = getWindow();
  if (window.isMinimized()) {
    return window.restore();
  }
  if (!window.isFocused()) {
    return window.focus()
  }
}

export {
  createWindow,
  getWindow,
  destoryWindow,
  showWindow,
}