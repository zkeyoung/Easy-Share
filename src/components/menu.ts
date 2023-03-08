import { app, Menu, BrowserWindow } from 'electron';
import { APP_NAME, CacheKey } from '../constant';
import { cache } from '../lib/cache';
import { pagePath } from '../lib/path';

/** Menu */
const menu = Menu.buildFromTemplate([
  {
    label: process.platform === 'darwin' ? APP_NAME: 'File',
    submenu: [
      {
        label: 'Settings',
        accelerator: 'CommandOrControl+,',
        click: () => {
          const window: BrowserWindow = cache.get(CacheKey.MAIN_WINDOW);
          window.loadFile(pagePath, { hash: '#/settings' });
        }
      },
      { type: 'separator' },
      {
        label: 'Quit Easy Share',
        accelerator: 'CommandOrControl+Q',
        click: () => app.quit(),
      },
    ]
  }
]);

Menu.setApplicationMenu(menu);