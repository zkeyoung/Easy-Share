import fs from 'node:fs/promises';
import { CacheKey, Language } from '../constant';
import File from '../entity/file';
import Settings from '../entity/settings';
import { cache } from '../lib/cache';
import { randomString } from '../lib/utils';

async function postFile(file: File) {
  const { host, port, language }: Settings = cache.get(CacheKey.SETTINGS);
  if (!cache.get(CacheKey.HTTP_SERVER)) {
    const msg = language === Language.enUS ? 'The server is not running.' : '服务未启动';
    return { code: 500, msg: msg };
  }
  const path = file.path;
  const stats = await fs.stat(path);
  if (stats.isDirectory()) {
    const msg = language === Language.enUS ? 'Not currently supporting folders.' : '暂不支持文件夹';
    return { code: 400, msg: msg };
  }
  const id = randomString(6);
  cache.set(id, file);
  const download = `http://${host}:${port}/${id}`;
  return {
    code: 0,
    msg: 'success',
    data: { id, download },
  }
}

async function deleteFile(id: string) {
  cache.delete(id);
  return { code: 0, msg: 'success' };
}

export {
  postFile,
  deleteFile,
}