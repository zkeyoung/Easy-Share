const { version } = require('./package.json');
const path = require('node:path');
module.exports = {
  packagerConfig: {
    name: 'Easy Share',
    executableName: 'easy-share',
    asar: true,
    ignore: [
      "^/node_modules",
      "^/src",
      "forge.config.js",
      "tsconfig.json",
      "LICENSE",
      ".gitignore",
      ".vscode",
    ],
    icon: 'static/logo'
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: (arch) => ({
        name: 'easy-share',
        authors: 'zkeyoung',
        exe: 'easy-share.exe',
        iconUrl:
          'https://raw.githubusercontent.com/zkeyoung/static/main/Easy-Share/logo.ico',
        noMsi: true,
        setupExe: `easy-share-${version}-win32-${arch}-setup.exe`,
        setupIcon: path.resolve(__dirname, 'static', 'logo.ico'),
      }),
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      platforms: ['linux'],
      config: {
        icon: {
          scalable: path.resolve(__dirname, 'static', 'logo.svg'),
          mimeType: ['x-scheme-handler/easy-share'],
        },
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      platforms: ['linux'],
      config: {
        icon: {
          scalable: path.resolve(__dirname, 'static', 'logo.svg'),
          mimeType: ['x-scheme-handler/easy-share'],
        },
      },
    },
  ],
};
