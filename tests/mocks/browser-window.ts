import { EventEmitter } from 'events';

import { WebContentsMock } from './web-contents';

export class BrowserWindowMock extends EventEmitter {
  public static getAllWindows = jest.fn();
  public static getFocusedWindow = jest.fn();
  public static fromWebContents = jest.fn();
  public static fromId = jest.fn();
  public static addDevToolsExtension = jest.fn();
  public static removeDevToolsExtension = jest.fn();
  public static getDevToolsExtension = jest.fn();

  public blur = jest.fn();
  public blurWebView = jest.fn();
  public capturePage = jest.fn();
  public center = jest.fn();
  public close = jest.fn();
  public closeFilePreview = jest.fn();
  public destroy = jest.fn();
  public flashFrame = jest.fn();
  public focus = jest.fn();
  public focusOnWebView = jest.fn();
  public getAspectRatio = jest.fn();
  public getBrowserView = jest.fn();
  public getChildWindows = jest.fn();
  public getContentBounds = jest.fn();
  public getContentSize = jest.fn();
  public getMaximumSize = jest.fn();
  public getMinimumSize = jest.fn();
  public getNativeWindowHandle = jest.fn();
  public getParentWindow = jest.fn();
  public getPosition = jest.fn();
  public getRepresentedFilename = jest.fn();
  public getSize = jest.fn();
  public getTitle = jest.fn();
  public hasShadow = jest.fn();
  public hide = jest.fn();
  public hookWindowMessage = jest.fn();
  public isAlwaysOnTop = jest.fn();
  public isClosable = jest.fn();
  public isDestroyed = jest.fn();
  public isDocumentEdited = jest.fn();
  public isFullScreen = jest.fn();
  public isFullScreenable = jest.fn();
  public isHidden = jest.fn();
  public isKiosk = jest.fn();
  public isFocused = jest.fn();
  public isMaximizable = jest.fn();
  public isMaximized = jest.fn();
  public isMenuBarAutoHide = jest.fn();
  public isMenuBarVisible = jest.fn();
  public isMinimized = jest.fn();
  public isMinimizable = jest.fn();
  public isModal = jest.fn();
  public isMovable = jest.fn();
  public isResizable = jest.fn();
  public isVisible = jest.fn(() => true);
  public isVisibleOnAllWorkspaces = jest.fn();
  public isWindowMessageHooked = jest.fn();
  public loadURL = jest.fn();
  public loadFile = jest.fn();
  public loadURl = jest.fn();
  public maximize = jest.fn();
  public minimize = jest.fn();
  public previewFile = jest.fn();
  public reload = jest.fn();
  public restore = jest.fn();
  public setBounds = jest.fn();
  public setAlwaysOnTop = jest.fn();
  public setAppDetails = jest.fn();
  public setAspectRatio = jest.fn();
  public setAutoHideMenuBar = jest.fn();
  public setAutoHideCursor = jest.fn();
  public setBrowserView = jest.fn();
  public setClosable = jest.fn();
  public setContentBounds = jest.fn();
  public setContentProtection = jest.fn();
  public setContentSize = jest.fn();
  public setDocumentEdited = jest.fn();
  public setFocusable = jest.fn();
  public setFullScreen = jest.fn();
  public setFullScreenable = jest.fn();
  public setHasShadow = jest.fn();
  public setIcon = jest.fn();
  public setIgnoreMouseEvents = jest.fn();
  public setKiosk = jest.fn();
  public setMaximizable = jest.fn();
  public setMenu = jest.fn();
  public setMenuBarVisibility = jest.fn();
  public setMenuBarAutoHide = jest.fn();
  public setMaximumSize = jest.fn();
  public setMinimumSize = jest.fn();
  public setMinimizable = jest.fn();
  public setPosition = jest.fn();
  public setSize = jest.fn();
  public setMovable = jest.fn();
  public setOverlayIcon = jest.fn();
  public setParentWindow = jest.fn();
  public setProgressBar = jest.fn();
  public setRepresentedFilename = jest.fn();
  public setResizable = jest.fn();
  public setSheetOffset = jest.fn();
  public setSkipTaskbar = jest.fn();
  public setThumbarButtons = jest.fn();
  public setThumbnailClip = jest.fn();
  public setThumbnailToolTip = jest.fn();
  public setTitle = jest.fn();
  public setVibrancy = jest.fn();
  public setVisibleOnAllWorkspaces = jest.fn();
  public show = jest.fn();
  public showDefinitionForSelection = jest.fn();
  public showInactive = jest.fn();
  public unhookWindowMessage = jest.fn();
  public unhookAllWindowMessages = jest.fn();
  public unmaximize = jest.fn();

  public getBounds = jest.fn(() => {
    return { x: 0, y: 0, width: 1920, height: 1080 };
  });

  public webContents = new WebContentsMock();
  public id = 1;

  constructor() {
    super();
  }
}