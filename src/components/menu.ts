import { APP_GITHUB_ISSUES, Language } from './../constant/index';
import { app, Menu, BrowserWindow, shell } from 'electron';
import { APP_NAME, CacheKey } from '../constant';
import { cache } from '../lib/cache';
import { pagePath } from '../lib/path';
import type Settings from '../entity/settings';

const { language = Language.enUS }: Settings = cache.get(CacheKey.SETTINGS);

const DisplayLabel = {
  [Language.enUS]: {
    File: 'File',
    Settings: 'Settings',
    Quit: 'Quit Easy Share',
    Help: 'Help',
  },
  [Language.zhCN]: {
    File: '文件',
    Settings: '设置',
    Quit: '退出 Easy Share',
    Help: '帮助',
  }
}[language]

/** Menu */
const menu = Menu.buildFromTemplate([
  {
    label: process.platform === 'darwin' ? APP_NAME: DisplayLabel.File,
    submenu: [
      {
        label: DisplayLabel.Settings,
        accelerator: 'CommandOrControl+,',
        click: () => {
          const window: BrowserWindow = cache.get(CacheKey.MAIN_WINDOW);
          window.loadFile(pagePath, { hash: '#/settings' });
        }
      },
      { type: 'separator' },
      {
        label: DisplayLabel.Quit,
        accelerator: 'CommandOrControl+Q',
        click: () => app.quit(),
      },
    ]
  },
  {
    label: DisplayLabel.Help,
    role: 'help',
    submenu: [
      {
        label: 'Github Issues',
        click: async () => {
          await shell.openExternal(APP_GITHUB_ISSUES);
        }
      }
    ]
  }
]);

Menu.setApplicationMenu(menu);