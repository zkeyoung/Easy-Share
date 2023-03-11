import { app, dialog } from 'electron';
import { CacheKey, Language } from './constant';
import Settings from './entity/settings';
import { cache } from './lib/cache';
import { preTask } from './lib/prerequisite';
import { writeFileSync } from 'fs';
import { logFilePath } from './lib/path';

main().catch(err => {
  try {
    const { language = Language.enUS }: Settings = cache.get(CacheKey.SETTINGS) || {};
    dialog.showErrorBox('Easy Share', `${language === Language.enUS ? 'An exception has occurred, please contact the software developer.' : '发生异常，请联系作者。'}\nhttps://github.com/zkeyoung/Easy-Share`);
    writeFileSync(logFilePath, JSON.stringify(err.stack || err));
  } finally {
    app.quit();
  }
});

async function main() {
  if (require('electron-squirrel-startup')) {
    app.quit();
    return;
  }
  if (!app.requestSingleInstanceLock()) {
    app.quit();
    return;
  }
  await preTask();
  require('./app');
}