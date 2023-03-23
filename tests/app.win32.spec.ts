Object.defineProperty(process, 'platform', { value: 'win32' });

jest.mock('electron', () => require('./mocks/electron'));
const showWindow = jest.fn();
jest.mock('../src/window', () => ({ showWindow }));


import '../src/app';

import { app } from 'electron';

describe('run', () => {
  it('should invoke quit ', () => {
    app.emit('window-all-closed');
    expect(app.quit).toHaveBeenCalled();
  });
});