jest.mock('electron', () => require('../mocks/electron'));

import { MenuItem, BrowserWindow, app, shell } from 'electron';
const { Menu }  = require('../mocks/electron');
import { cache } from '../../src/lib/cache';
import { APP_GITHUB_ISSUES, CacheKey } from '../../src/constant';
import { pagePath } from '../../src/lib/path';
import '../../src/components/menu';
const items = Menu.MenuItems;

describe('menu run', () => {
  it('CommandOrControl+,', () => {
    const menu = items[0].submenu[0];
    const bw = new BrowserWindow();
    cache.set(CacheKey.MAIN_WINDOW, bw);
    menu.click(new MenuItem({}), undefined, {} as KeyboardEvent);
    expect(bw.loadFile).toHaveBeenCalledWith(pagePath, { hash: '#/settings' });
  });

  it('Quit Easy Share', () => {
    const menu = items[0].submenu[2];
    menu.click(new MenuItem({}), undefined, {} as KeyboardEvent);
    expect(app.quit).toHaveBeenCalled();
  });

  it('Github Issues', () => {
    const menu = items[1].submenu[0];
    menu.click(new MenuItem({}), undefined, {} as KeyboardEvent);
    expect(shell.openExternal).toHaveBeenCalledWith(APP_GITHUB_ISSUES);
  });
});