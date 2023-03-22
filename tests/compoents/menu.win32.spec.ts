Object.defineProperty(process, 'platform', { 
  value: 'win32'
});
import { CacheKey, Language } from './../../src/constant/index';
import { cache } from '../../src/lib/cache';
import { SETTINGS } from '../mocks/cache';
cache.set(CacheKey.SETTINGS, Object.assign({}, SETTINGS, { language: Language.zhCN }));

jest.mock('electron', () => require('../mocks/electron'));

const { Menu }  = require('../mocks/electron');
import '../../src/components/menu';
const items = Menu.MenuItems;

describe('menu run', () => {
  it('zhCN label', () => {
    expect(items[0].label).toBe('文件');
  });
});