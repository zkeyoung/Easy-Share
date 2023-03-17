import { ipcMain } from 'electron';
import { FileIPC, NetIPC, SettingsIPC, WindowIPC } from '../../src/constant';
import File from '../../src/entity/file';
import Settings from '../../src/entity/settings';
import '../../src/ipc';

jest.mock('electron', () => require('../mocks/electron'));

import * as fileModule from '../../src/ipc/file';
import * as netModule from '../../src/ipc/net';
import * as setttingsModule from '../../src/ipc/setttings';
import * as windowModule from '../../src/ipc/window';

jest.mock('../../src/ipc/file', () => {
  const mod = jest.requireActual('../../src/ipc/file');
  return Object.keys(mod).reduce((o, k) => {
    o[k] = jest.fn();
    return o;
  }, {});
});
jest.mock('../../src/ipc/net', () => {
  const mod = jest.requireActual('../../src/ipc/net');
  return Object.keys(mod).reduce((o, k) => {
    o[k] = jest.fn();
    return o;
  }, {});
});
jest.mock('../../src/ipc/setttings', () => {
  const mod = jest.requireActual('../../src/ipc/setttings');
  return Object.keys(mod).reduce((o, k) => {
    o[k] = jest.fn();
    return o;
  }, {});
});
jest.mock('../../src/ipc/window', () => {
  const mod = jest.requireActual('../../src/ipc/window');
  return Object.keys(mod).reduce((o, k) => {
    o[k] = jest.fn();
    return o;
  }, {});
});

const event = {} as Electron.IpcMainInvokeEvent;
describe('IPC', () => {
  it('FileIPC.POST', () => {
    const file = new File();
    ipcMain.emit(FileIPC.POST, event, file);
    expect(fileModule.postFile).toHaveBeenCalledWith(file);
  });

  it('SettingsIPC.PUT', () => {
    const settings = new Settings();
    ipcMain.emit(SettingsIPC.PUT, event, settings);
    expect(setttingsModule.putSettings).toHaveBeenCalledWith(settings);
  });

  it('no property ipc', () => {
    [
      [FileIPC.DELETE, fileModule.deleteFile],
      [NetIPC.INTRANET_GET, netModule.getIntranet],
      [SettingsIPC.GET, setttingsModule.getSettings],
      [WindowIPC.WEB_VIEW_FOCUS, windowModule.focusWebView],
    ].forEach(([eventName, method]) => {
      ipcMain.emit(eventName as string, event);
      expect(method).toHaveBeenCalled();
    });
  });

});