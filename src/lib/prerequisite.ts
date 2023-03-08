import fs from 'node:fs/promises';
import { CacheKey } from '../constant';
import { cache } from './cache';
import { appDataPath, settingsFilePath } from './path';
import httpServer from '../lib/server';

async function preTask() { 
  await guaranteePath();
  await readSettings();  
}

async function guaranteePath() {
  try {
    await fs.access(appDataPath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(appDataPath);
    } else {
      throw err;
    }
  }
}

async function readSettings() {
  let fileHandler: fs.FileHandle;
  try {
    fileHandler = await fs.open(settingsFilePath, 'r');
    const settingStrings = await fileHandler.readFile('utf8');
    const settings = JSON.parse(settingStrings);
    cache.set(CacheKey.SETTINGS, settings);
    const server = await httpServer.start(settings);
    if (!server) cache.delete(CacheKey.SETTINGS);
    cache.set(CacheKey.HTTP_SERVER, server);
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  } finally {
    await fileHandler?.close();
  }
}

export {
  preTask,
}