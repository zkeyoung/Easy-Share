import { BrowserWindow } from 'electron';
import path from 'node:path';
import { CacheKey } from './constant';
import { cache } from './lib/cache';
import { pagePath } from './lib/path';

function createWindow(): Promise<BrowserWindow> {
  return new Promise((resolve) => {
    const bwOption: Electron.BrowserWindowConstructorOptions = {
      height: 300,
      width: 280,
      resizable: false,
      show: false,
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
    window.once('ready-to-show', () => {
      resolve(window);
      window.show();
    });
    window.on('closed', () => {
      destoryWindow();
    });
    cache.set(CacheKey.MAIN_WINDOW, window);
  });
}

function getWindow(): BrowserWindow | undefined {
  return cache.get(CacheKey.MAIN_WINDOW);
}

function destoryWindow() {
  const window = getWindow();
  if (window) {
    cache.delete(CacheKey.MAIN_WINDOW);
  }
  for (const key of cache.keys()) {
    if (!CacheKey[key]) cache.delete(key);
  }
}

async function showWindow() {
  if (BrowserWindow.getAllWindows().length === 0) {
    await createWindow();
  }
  const window = getWindow();
  if (window) {
    if (window.isMinimized()) {
      window.restore();
    }
    if (!window.isFocused()) {
      window.focus();
    }
  }
}

export {
  createWindow,
  getWindow,
  destoryWindow,
  showWindow,
}