module.exports = async function (context) {
  if (context.electronPlatformName !== 'darwin') return;
  const { execSync } = require('child_process');
  const appName = context.packager.appInfo.productFilename;
  const appPath = `${context.appOutDir}/${appName}.app`;
  execSync(`codesign --force --deep --sign - "${appPath}"`);
};