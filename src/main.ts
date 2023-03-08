import { app } from 'electron';
import { preTask } from './lib/prerequisite';

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

main().catch(err => {
  throw err;
})

async function main() {
  await preTask();
  require('./app');
}