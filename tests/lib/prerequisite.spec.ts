const disk = {};
jest.mock('electron', () => require('../mocks/electron'));
jest.mock('node:fs/promises', () => {
  const { FSPromise } = require('../mocks/fs-promises');
  return new FSPromise(disk);
});

import fs from 'node:fs/promises'
import { preTask } from '../../src/lib/prerequisite';

describe('preTask()', () => {
  it('should mkdir and open failed', async () => {
    await preTask();
    expect(fs.access).toHaveBeenCalled();
    expect(fs.mkdir).toHaveBeenCalled();
    expect(fs.open).toHaveBeenCalled();
  });
});