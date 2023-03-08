import { contextBridge, ipcRenderer } from 'electron';

export enum FileIPC {
  POST = 'file:post',
  DELETE = 'file:delete',
}

export enum SettingsIPC {
  PUT = 'settings:put',
  GET = 'settings:get',
}

export enum NetIPC {
  INTRANET_GET = 'net:intranet:get',
}

export enum WindowIPC {
  WEB_VIEW_FOCUS = 'window:web_view:focus',
}

contextBridge.exposeInMainWorld('$main', {
  deleteFile: (id) => ipcRenderer.invoke(FileIPC.DELETE, id),
  postFile: (file) => ipcRenderer.invoke(FileIPC.POST, file),
  putSettings: (settings) => ipcRenderer.invoke(SettingsIPC.PUT, settings),
  getSettings: () => ipcRenderer.invoke(SettingsIPC.GET),
  getIntranet: () => ipcRenderer.invoke(NetIPC.INTRANET_GET),
  focusWebView: () => ipcRenderer.invoke(WindowIPC.WEB_VIEW_FOCUS),
});
