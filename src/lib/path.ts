import { app } from 'electron';
import path from 'node:path';
import { APP_NAME } from '../constant';

const appDataPath = path.join(app.getPath('appData'), APP_NAME);
const settingsFilePath = path.join(appDataPath, 'settings.json');
const pagePath = path.resolve(__dirname, '../../page/index.html');

export {
  appDataPath,
  settingsFilePath,
  pagePath,
}