module.exports = {
  packagerConfig: {
    name: 'Easy Share',
    executableName: 'Easy Share',
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
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
