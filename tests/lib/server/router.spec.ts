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
import { CacheKey } from '../../../src/constant';
import { SETTINGS } from '../../mocks/cache';
import File from '../../../src/entity/file';

describe('run', () => {
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
    expect(response.download).toHaveBeenCalled();
  });
});