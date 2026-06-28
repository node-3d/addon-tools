import node_path from "node:path";
import { fileURLToPath } from "node:url";
const nameWindows = 'windows';
const platformAndArch = `${process.platform}-${process.arch}`;
const platformNames = {
    'win32-x64': nameWindows,
    'linux-x64': 'linux',
    'darwin-x64': 'osx',
    'linux-arm64': 'aarch64'
};
const platformName = platformNames[platformAndArch] || platformAndArch;
const isWindows = platformName === nameWindows;
const getPaths = (dir)=>{
    const dirFws = dir.replaceAll('\\', '/');
    const bin = `${dirFws}/bin-${platformName}`;
    const include = `${dirFws}/include`;
    if (isWindows) process.env.path = `${bin};${process.env.path ? `${process.env.path}` : ''}`;
    return {
        bin,
        include
    };
};
const getBin = ()=>`bin-${platformName}`;
const printBin = ()=>console.log(getBin());
const getPlatform = ()=>platformName;
const printPlatform = ()=>console.log(getPlatform());
const getNodeAddonApiIncludeDir = ()=>{
    try {
        const packageUrl = import.meta.resolve('node-addon-api/package.json');
        const packageDir = node_path.dirname(fileURLToPath(packageUrl));
        return node_path.relative('.', packageDir).replaceAll('\\', '/');
    } catch  {
        return '';
    }
};
const getInclude = ()=>{
    const rootPath = node_path.resolve(`${import.meta.dirname}/..`).replaceAll('\\', '/');
    const napiInclude = getNodeAddonApiIncludeDir();
    const thisInclude = `${rootPath}/include`;
    return `${napiInclude} ${thisInclude}`.trim();
};
const printInclude = ()=>console.log(getInclude());
export { getBin, getInclude, getPaths, getPlatform, printBin, printInclude, printPlatform };
