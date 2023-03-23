import { EventEmitter } from 'events';

import { BrowserWindowMock } from './browser-window';
import { WebContentsMock } from './web-contents';

const createdNotifications: Array<NotificationMock> = [];

export class NotificationMock extends EventEmitter {
  public readonly show = jest.fn();

  public static isSupported = jest.fn(() => true);

  constructor(public readonly options: any) {
    super();
    this.options = options;
    createdNotifications.push(this);
  }
}

class Screen extends EventEmitter {
  public readonly getDisplayMatching = jest.fn();
  public readonly getDisplayNearestPoint = jest.fn();
  public readonly getPrimaryDisplay = jest.fn();
  public readonly getCursorScreenPoint = jest.fn();
}

class AutoUpdaterMock extends EventEmitter {
  public readonly quitAndInstall = jest.fn();
}

export class MenuMock {
  public static readonly setApplicationMenu = jest.fn();
  public static readonly sendActionToFirstResponder = jest.fn();
  public static readonly getApplicationMenu = jest.fn();
  public static readonly buildFromTemplate = jest.fn((menuItems) => {
    MenuMock.MenuItems = menuItems;
  });
  public static MenuItems: MenuItemMock[] = [];
  public readonly popup = jest.fn();
  public readonly closePopup = jest.fn();
  public items: Array<MenuItemMock> = [];
  public append(mi: MenuItemMock) {
    this.items.push(mi);
  }
  public insert(pos: number, mi: MenuItemMock) {
    this.items = this.items.splice(pos, 0, mi);
  }
}

export class NativeImageMock {
  public readonly args: Array<any>;
  constructor(...args: Array<any>) {
    this.args = args;
  }
}

export class MenuItemMock {
  public enabled: boolean;
  public visible: boolean;
  public label: string;
  public type: string;
  public submenu: MenuItemMock[];
  public click: (
    menuItem: Electron.MenuItem,
    browserWindow: Electron.BrowserWindow | undefined,
    event: KeyboardEvent,
  ) => void;

  constructor(options: Electron.MenuItemConstructorOptions) {
    this.enabled = !!options.enabled;
    this.label = options.label!;
    this.click = options.click!;
    this.visible = !!options.visible;
    this.type = options.type as string;
  }
}

export class IPCMainMock extends EventEmitter {
  public handle = jest.fn((event, callback) => {
    this.on(event, callback);
  });
  public handleOnce = jest.fn();
  public removeHandler = jest.fn();
  public send = jest.fn();
}

export class IPCRendererMock extends EventEmitter {
  public send = jest.fn();
  public invoke = jest.fn();
}

function CreateWindowStub() {
  return {
    id: 0,
    setMenuBarVisibility: jest.fn(),
    setAutoHideMenuBar: jest.fn(),
    setIgnoreMouseEvents: jest.fn(),
    setTitle: jest.fn(),
    reload: jest.fn(),
    isDestroyed: jest.fn(() => false),
  };
}

class App extends EventEmitter {
  public addRecentDocument = jest.fn();
  public getName = jest.fn().mockReturnValue('Electron Fiddle');
  public setName = jest.fn();
  public setAppUserModelId = jest.fn();
  public exit = jest.fn();
  public hide = jest.fn();
  public show = jest.fn();
  public isDefaultProtocolClient = jest.fn().mockReturnValue(true);
  public setAsDefaultProtocolClient = jest.fn();
  public isReady = jest.fn().mockReturnValue(true);
  public isInApplicationsFolder = jest.fn().mockReturnValue(true);
  public moveToApplicationsFolder = jest.fn();
  public getAppMetrics = jest.fn().mockReturnValue({ metrics: 123 });
  public getGPUFeatureStatus = jest.fn();
  public getJumpListSettings = jest.fn(() => ({
    removedItems: [],
  }));
  public getLoginItemSettings = jest.fn();
  public getPath = jest.fn((name: string) => {
    if (name === 'appData') return '/easy-share';
    return '/test-path';
  });
  public focus = jest.fn();
  public quit = jest.fn();
  public relaunch = jest.fn();
  public setJumpList = jest.fn();
  public requestSingleInstanceLock = jest.fn();
  public whenReady = () => Promise.resolve();
  public removeAllListeners = jest.fn();
}

const mainWindowStub = CreateWindowStub();
const focusedWindowStub = CreateWindowStub();
const autoUpdater = new AutoUpdaterMock();

const session = {
  defaultSession: {
    clearCache: jest.fn((cb) => cb()),
    clearStorageData: jest.fn((_opts, cb) => cb()),
    cookies: {
      get: jest.fn(),
    },
  },
};

const shell = {
  openExternal: jest.fn(),
  openPath: jest.fn(),
  showItemInFolder: jest.fn(),
};

const systemPreferences = {
  getUserDefault: jest.fn(),
};

const electronMock = {
  app: new App(),
  autoUpdater,
  BrowserWindow: BrowserWindowMock,
  clipboard: {
    readText: jest.fn(),
    readImage: jest.fn(),
    writeText: jest.fn(),
    writeImage: jest.fn(),
  },
  crashReporter: {
    start: jest.fn(),
  },
  dialog: {
    showErrorBox: jest.fn(),
    showOpenDialog: jest.fn().mockResolvedValue({}),
    showOpenDialogSync: jest.fn().mockReturnValue(['path']),
    showMessageBox: jest.fn().mockResolvedValue({}),
  },
  ipcMain: new IPCMainMock(),
  ipcRenderer: new IPCRendererMock(),
  nativeImage: {
    createFromPath: (...args: Array<any>) => new NativeImageMock(...args),
    createFromBuffer: jest.fn(),
    createFromDataURL: jest.fn(function () {
      return { toPNG: jest.fn(() => 'content') };
    }),
    createEmpty: jest.fn(),
  },
  match: jest.fn(),
  Menu: MenuMock,
  MenuItem: MenuItemMock,
  Notification: NotificationMock,
  _notifications: createdNotifications,
  protocol: {
    registerStandardSchemes: jest.fn(),
    registerServiceWorkerSchemes: jest.fn(),
    registerFileProtocol: jest.fn(),
    registerBufferProtocol: jest.fn(),
    registerStringProtocol: jest.fn(),
    registerHttpProtocol: jest.fn(),
    registerStreamProtocol: jest.fn(),
    unregisterProtocol: jest.fn(),
    isProtocolHandled: jest.fn(),
    interceptFileProtocol: jest.fn(),
    interceptStringProtocol: jest.fn(),
    interceptBufferProtocol: jest.fn(),
    interceptHttpProtocol: jest.fn(),
    uninterceptProtocol: jest.fn(),
  },
  require: jest.fn(),
  screen: new Screen(),
  session,
  shell,
  systemPreferences,
  webContents: WebContentsMock,
};

electronMock.BrowserWindow.getAllWindows.mockReturnValue([]);
electronMock.BrowserWindow.fromId.mockReturnValue(mainWindowStub);
electronMock.BrowserWindow.fromWebContents.mockReturnValue(mainWindowStub);
electronMock.BrowserWindow.getFocusedWindow.mockReturnValue(focusedWindowStub);

module.exports = electronMock;