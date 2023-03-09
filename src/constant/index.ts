export const APP_NAME = 'Easy Share';
export const APP_GITHUB_ISSUES = 'https://github.com/zkeyoung/Easy-Share/issues';

export enum Environment {
  DEV = 'development',
  STAGE = 'stage',
  PROD = 'production',
}

export enum CacheKey {
  MAIN_WINDOW = 'MAIN_WINDOW',
  SETTINGS = 'SETTINGS',
  HTTP_SERVER = 'HTTP_SERVER',
}

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

export enum Language {
  zhCN = 'zhCN',
  enUS = 'enUS',
}