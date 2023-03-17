import { fsPromises, DISK } from '../mocks/fs-promises';
import { postFile, deleteFile } from '../../src/ipc/file';
import File from '../../src/entity/file';
import { settingsFilePath } from '../../src/lib/path';
import { cache } from '../../src/lib/cache';
import { CacheKey, Language, } from '../../src/constant';
import { randomString } from '../../src/lib/utils';

jest.mock('electron', () => require('../mocks/electron'));
jest.mock('node:fs/promises', () => fsPromises);

const file = new File();
file.name = 'settings.json';
file.path = settingsFilePath;
file.mime = '';

beforeEach(() => {
  cache.set(CacheKey.SETTINGS, { port: 8888, internet: '192.168.1.1', language: Language.enUS });
});

describe('postFile()', () => {
  it('should return 500', async () => {
    expect(cache.get(CacheKey.HTTP_SERVER)).toBeFalsy();
    {
      const { code, msg } = await postFile(file);
      expect(code).toBe(500);
      expect(msg).toBe('The server is not running.');
    }
    {
      const settings = cache.get(CacheKey.SETTINGS);
      cache.set(CacheKey.SETTINGS, Object.assign(settings, { language: Language.zhCN }));
      const { msg } = await postFile(file);
      expect(msg).toBe('服务未启动');
    }
  });

  it('should return 400', async () => {
    DISK.set(file.path, { type: 'dir' });
    cache.set(CacheKey.HTTP_SERVER, 'exist');
    {
      const { code, msg } = await postFile(file);
      expect(code).toBe(400);
      expect(msg).toBe('Not currently supporting folders.');
    }
    {
      const settings = cache.get(CacheKey.SETTINGS);
      cache.set(CacheKey.SETTINGS, Object.assign(settings, { language: Language.zhCN }));
      const { msg } = await postFile(file);
      expect(msg).toBe('暂不支持文件夹');
    }
  });

  it('should return 200', async () => {
    cache.set(CacheKey.HTTP_SERVER, 'exist');
    DISK.set(file.path, { ...file });
    const { code, msg, data } = await postFile(file);
    expect(code).toBe(0);
    expect(msg).toBe('success');
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('download');
    if (data) {
      const { id, download } = data;
      expect(cache.get(id)).toBe(file);
      expect(typeof id).toBe('string');
      expect(id).toHaveLength(6);
      const { host, port } = cache.get(CacheKey.SETTINGS);
      expect(download).toBe(`http://${host}:${port}/${id}`);
    }
  });
});

describe('deleteFile()', () => {
  it('success', async () => {
    const id = randomString(6);
    cache.set(id, file);
    const { code, msg } = await deleteFile(id);
    expect(code).toBe(0);
    expect(msg).toBe('success');
  });
});