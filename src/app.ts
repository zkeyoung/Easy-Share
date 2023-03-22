import { app } from 'electron';
import type { Server } from 'node:http';
import { APP_NAME, CacheKey } from './constant';
import { cache } from './lib/cache';
import { showWindow } from './window';
import './ipc';
import './components/menu';

app.setName(APP_NAME);

if (process.platform === 'win32') {
  app.setAppUserModelId(APP_NAME);
}

app.on('second-instance', () => {
  showWindow();
});

app.whenReady().then(() => {
  showWindow();
});

if (process.platform === 'darwin') {
  app.on('activate', () => {
    showWindow();
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  const server: Server = cache.get(CacheKey.HTTP_SERVER);
  if (server) {
    server.close();
  }
});