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

describe('run', () => {
  it('get: success', () => {
    router.run('/abcd');
    expect(response.sendStatus).toHaveBeenCalled();
    expect(Notification.isSupported).not.toHaveBeenCalled();
  });
});