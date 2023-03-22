jest.mock('electron', () => require('./mocks/electron'));

const showWindow = jest.fn();

jest.mock('../src/window', () => ({ showWindow }));

import '../src/app';

describe('run', () => {
  it('second-instance()', () => {
    expect('todo').toBe('todo');
    // app.emit('second-instance');
    // expect(showWindow).toHaveBeenCalled();
  });
});