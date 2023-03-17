import { fsPromises } from '../mocks/fs-promises';
import { server, SERVER_INTERNAL } from '../mocks/server';
import { CacheKey, Language } from '../../src/constant';
import { getSettings, putSettings } from '../../src/ipc/setttings';
import { cache } from '../../src/lib/cache';
import { SETTINGS } from '../mocks/cache';

jest.mock('electron', () => require('../mocks/electron'));
jest.mock('node:fs/promises', () => fsPromises);
jest.mock('../../src/lib/server', () => server);

describe('getSettings()', () => {
  it('success', async () => {
    cache.set(CacheKey.SETTINGS, SETTINGS);
    const { code, msg, data: settings } = await getSettings();
    expect(code).toBe(0);
    expect(msg).toBe('success');
    expect(settings).toEqual(SETTINGS);
  });
});

describe('putSettings()', () => {
  it('should throw error', async () => {
    const error = new Error('I am an error');
    try {
      fsPromises.writeFile.mockRejectedValueOnce(error);
      await putSettings(SETTINGS);
    } catch (err) {
      expect(err).toBe(error);
    }
  });
  
  it('success', async () => {
    const { code, msg } = await putSettings(SETTINGS);
    expect(code).toBe(0);
    expect(msg).toBe('success');
    expect(cache.get(CacheKey.HTTP_SERVER)).toBe(server);
    expect(cache.get(CacheKey.SETTINGS)).toEqual(SETTINGS);
  });

  it('should return 400', async () => {
    SERVER_INTERNAL[SETTINGS.port] = true;
    {
      const { code, msg } = await putSettings(SETTINGS);
      expect(code).toBe(400);
      expect(msg).toBe(`${SETTINGS.port} is already in use`);
    }
    {
      cache.set(CacheKey.HTTP_SERVER, server);
      const { code, msg } = await putSettings(Object.assign({}, SETTINGS, {language: Language.zhCN}));
      expect(code).toBe(400);
      expect(msg).toBe(`${SETTINGS.port} 端口已被占用`);
      expect(server.close).toHaveBeenCalled();
    }
  });
});