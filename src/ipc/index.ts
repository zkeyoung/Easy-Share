import { ipcMain } from 'electron';
import { FileIPC, SettingsIPC, NetIPC, WindowIPC } from '../constant';
import { deleteFile, postFile } from './file';
import { getIntranet } from './net';
import { putSettings, getSettings  } from './setttings';
import { focusWebView } from './window';

ipcMain.handle(FileIPC.POST, (event, file) => postFile(file));
ipcMain.handle(FileIPC.DELETE, (event, id) => deleteFile(id));

ipcMain.handle(SettingsIPC.PUT, (event, settings) => putSettings(settings));
ipcMain.handle(SettingsIPC.GET, (event) => getSettings());

ipcMain.handle(NetIPC.INTRANET_GET, (event) => getIntranet());

ipcMain.handle(WindowIPC.WEB_VIEW_FOCUS, (event) => focusWebView());