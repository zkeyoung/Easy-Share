import { app } from 'electron';
import { preTask } from './lib/prerequisite';

main().catch(err => {
  throw err;
})

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