import { createRouter } from '../../mocks/server/router';
import { router } from '../../mocks/server/router';
const electron = require('../../mocks/electron');
const { Notification } = electron;
jest.mock('electron', () => electron);
jest.mock('express', () => {
  return {
    Router: createRouter,
  };
})

import '../../../src/lib/server/router';
import { response } from '../../mocks/server/res';
import { cache } from '../../../src/lib/cache';
import { CacheKey, Language } from '../../../src/constant';
import { SETTINGS } from '../../mocks/cache';
import File from '../../../src/entity/file';

describe('run', () => {

  beforeEach(() => {
    cache.clear();
  });

  it('get: 404', () => {
    router.run('/abcd');
    expect(response.sendStatus).toHaveBeenCalledWith(404);
    expect(Notification.isSupported).not.toHaveBeenCalled();
  });

  it('get: success', () => {
    cache.set(CacheKey.SETTINGS, SETTINGS);
    const file = new File();
    file.name = 'settings.json';
    file.path = '123';
    file.mime = '';
    cache.set('aAbBcC', file);
    router.run('/aAbBcC');
    expect(Notification.isSupported).toHaveBeenCalled();
    expect(electron._notifications[0]).toBeTruthy();
    electron._notifications.pop();
    expect(response.download).toHaveBeenCalled();
  });

  it('notify language', () => {
    cache.set(CacheKey.SETTINGS, Object.assign({}, SETTINGS, { language: Language.zhCN }));
    const file = new File();
    file.name = 'settings.json';
    file.path = '123';
    file.mime = '';
    cache.set('aAbBcC', file);
    router.run('/aAbBcC');
    expect(Notification.isSupported).toHaveBeenCalled();
    expect(electron._notifications[0]).toBeTruthy();
    expect(electron._notifications[0].options.body).toBe(`${file.name} 正在被下载...`)
    electron._notifications.pop();
  });

  it('download error', () => {
    cache.set(CacheKey.SETTINGS, SETTINGS);
    const file = new File();
    file.name = 'settings.json';
    file.path = '123';
    file.mime = '';
    cache.set('aAbBcC', file);
    router.run('/aAbBcC');
    expect(response.download).toHaveBeenCalled();
    response.headersSent = false;
    response.run();
    expect(response.json).toHaveBeenCalledWith(`${file.name} download failed`);
  });
});