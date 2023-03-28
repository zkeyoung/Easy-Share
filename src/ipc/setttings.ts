import fs from 'node:fs/promises';
import { cache } from '../lib/cache';
import Settings from '../entity/settings';
import { CacheKey, Language } from '../constant';
import type { Server } from 'node:http';
import httpServer from '../lib/server';
import { settingsFilePath } from '../lib/path';

async function getSettings() {
  const settings = cache.get(CacheKey.SETTINGS);
  return { code: 0, msg: 'success', data: settings };
}

async function putSettings(settings: Settings) {
  await fs.writeFile(settingsFilePath, JSON.stringify(settings));
  cache.set(CacheKey.SETTINGS, settings);
  let server: Server | null = cache.get(CacheKey.HTTP_SERVER);
  if (server) server.close();
  server = await httpServer.start(settings);
  if (!server) {
    const msg = settings.language === Language.enUS ? ' is already in use' : ' 端口已被占用';
    return { code: 400, msg: settings.port + msg };
  }
  cache.set(CacheKey.HTTP_SERVER, server);
  return { code: 0, msg: 'success' };
}

export {
  putSettings,
  getSettings,
}