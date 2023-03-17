import { fsPromises, DISK, createDir } from '../mocks/fs-promises';
import { SETTINGS } from '../mocks/cache';
import { server } from '../mocks/server';
import httpServer from '../../src/lib/server';
import fs from 'node:fs/promises';
import { preTask } from '../../src/lib/prerequisite';
import { appDataPath, settingsFilePath } from '../../src/lib/path';
import { CacheKey } from '../../src/constant';
import { cache } from '../../src/lib/cache';

jest.mock('node:fs/promises', () => fsPromises);
jest.mock('../../src/lib/server', () => server);
jest.mock('electron', () => require('../mocks/electron'));

describe('guaranteePath()', () => {
  it('should mkdir if not exist', async () => {
    await preTask();
    expect(fs.access).toHaveBeenCalled();
    expect(fs.mkdir).toHaveBeenCalled();
    expect(DISK.get(appDataPath)).toBeTruthy();
  });

  it('should not mkdir if exist', async () => {
    DISK.set(appDataPath, createDir);
    await preTask();
    expect(fs.access).toHaveBeenCalled();
    expect(fs.mkdir).not.toHaveBeenCalled();
  });

  it('should throw error', async () => {
    const err = new Error('I am an error');
    fsPromises.access.mockRejectedValueOnce(err);
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
    fsPromises.open.mockRejectedValueOnce(err);
    try {
      await preTask();
      expect(fs.open).toHaveBeenCalled();
    } catch (err) {
      expect(err).toBe(err);
    }
  });

  it('should not start server', async () => {
    server.start.mockResolvedValueOnce(undefined);
    DISK.set(settingsFilePath, JSON.stringify(SETTINGS));
    await preTask()
    expect(fs.open).toHaveBeenCalled();
    expect(httpServer.start).toHaveBeenCalled();
    expect(cache.get(CacheKey.SETTINGS)).toBeFalsy();
    expect(cache.get(CacheKey.HTTP_SERVER)).toBeFalsy();
  });

  it('run success', async () => {
    DISK.set(settingsFilePath, JSON.stringify(SETTINGS));
    await preTask()
    expect(fs.open).toHaveBeenCalled();
    expect(httpServer.start).toHaveBeenCalled();
    expect(cache.get(CacheKey.SETTINGS)).toEqual(SETTINGS);
    expect(cache.get(CacheKey.HTTP_SERVER)).toBeTruthy();
  });
});