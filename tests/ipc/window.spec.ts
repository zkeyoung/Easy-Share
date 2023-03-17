import { CacheKey } from '../../src/constant';
import { focusWebView } from '../../src/ipc/window';
import { cache } from '../../src/lib/cache';
import { BrowserWindowMock } from '../mocks/browser-window';

jest.mock('electron', () => require('../mocks/electron'));

describe('focusWebView()', () => {
  it('success', async () => {
    const browserWindow = new BrowserWindowMock();
    cache.set(CacheKey.MAIN_WINDOW, browserWindow);
    await focusWebView();
    expect(browserWindow.focusOnWebView).toHaveBeenCalled();
  });
});