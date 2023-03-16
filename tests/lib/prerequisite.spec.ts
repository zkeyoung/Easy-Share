import { FSPromise, createDir } from '../mocks/fs-promises';
import { server } from '../mocks/server';
const disk = {};
const fsPromsie = new FSPromise(disk);
jest.mock('electron', () => require('../mocks/electron'));
jest.mock('node:fs/promises', () => fsPromsie);
jest.mock('../../src/lib/server', () => server);
import httpServer from '../../src/lib/server';

import fs from 'node:fs/promises';
import { preTask } from '../../src/lib/prerequisite';
import { appDataPath, settingsFilePath } from '../../src/lib/path';
import { CacheKey, Language } from '../../src/constant';
import { cache } from '../../src/lib/cache';

describe('guaranteePath()', () => {
  it('should mkdir if not exist', async () => {
    await preTask();
    expect(fs.access).toHaveBeenCalled();
    expect(fs.mkdir).toHaveBeenCalled();
    expect(disk[appDataPath]).toBeTruthy();
  });

  it('should not mkdir if exist', async () => {
    disk[appDataPath] = createDir();
    await preTask();
    expect(fs.access).toHaveBeenCalled();
    expect(fs.mkdir).not.toHaveBeenCalled();
  });

  it('should throw error', async () => {
    const err = new Error('I am an error');
    fsPromsie.access.mockRejectedValueOnce(err);
    try {
      await preTask();
      expect(fs.access).toHaveBeenCalled();
      expect(fs.mkdir).not.toHaveBeenCalled();
    } catch (err) {
      expect(err).toBe(err);
    }
  });
});

describe('readSettings()', () => {
  it('should throw err', async () => {
    const err = new Error('I am an error');
    fsPromsie.open.mockRejectedValueOnce(err);
    try {
      await preTask();
      expect(fs.open).toHaveBeenCalled();
    } catch (err) {
      expect(err).toBe(err);
    }
  });

  it('should not start server', async () => {
    server.start.mockResolvedValueOnce(undefined);
    const settings = { port: 8888, internet: '192.168.1.1', language: Language.enUS };
    disk[settingsFilePath] = JSON.stringify(settings);
    await preTask()
    expect(fs.open).toHaveBeenCalled();
    expect(httpServer.start).toHaveBeenCalled();
    expect(cache.get(CacheKey.SETTINGS)).toBeFalsy();
    expect(cache.get(CacheKey.HTTP_SERVER)).toBeFalsy();
  });

  it('run success', async () => {
    const settings = { port: 8888, internet: '192.168.1.1', language: Language.enUS };
    disk[settingsFilePath] = JSON.stringify(settings);
    await preTask()
    expect(fs.open).toHaveBeenCalled();
    expect(httpServer.start).toHaveBeenCalled();
    expect(cache.get(CacheKey.SETTINGS)).toEqual(settings);
    expect(cache.get(CacheKey.HTTP_SERVER)).toBeTruthy();
  });
});