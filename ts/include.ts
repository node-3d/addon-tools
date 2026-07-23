import path from 'node:path';
import { fileURLToPath } from 'node:url';

const nameWindows = 'windows';
const platformAndArch = `${process.platform}-${process.arch}`;

const platformNames: Readonly<Record<string, string>> = {
	'win32-x64': nameWindows,
	'linux-x64': 'linux',
	'darwin-x64': 'osx',
	'linux-arm64': 'aarch64',
};

const platformName = platformNames[platformAndArch] || platformAndArch;
const isWindows = process.platform === 'win32';

type TAddonPaths = { bin: string; include: string };

export const getPaths = (dir: string): TAddonPaths => {
	const dirFws = dir.replaceAll('\\', '/');
	const bin = `${dirFws}/bin-${platformName}`;
	const include = `${dirFws}/include`;

	if (isWindows) {
		// oxlint-disable-next-line node/no-process-env
		process.env.path = `${bin};${process.env.path ? `${process.env.path}` : ''}`;
	}

	return { bin, include };
};

export const getBin = (): string => `bin-${platformName}`;

// oxlint-disable-next-line no-console
export const printBin = (): void => console.log(getBin());

export const getPlatform = (): string => platformName;

// oxlint-disable-next-line no-console
export const printPlatform = (): void => console.log(getPlatform());

const getNodeAddonApiIncludeDir = () => {
	try {
		const packageUrl = import.meta.resolve('node-addon-api/package.json');
		const packageDir = path.dirname(fileURLToPath(packageUrl));
		return path.relative('.', packageDir).replaceAll('\\', '/');
	} catch {
		return '';
	}
};

export const getInclude = (): string => {
	const rootPath = path.resolve(`${import.meta.dirname}/..`).replaceAll('\\', '/');
	const napiInclude = getNodeAddonApiIncludeDir();
	const thisInclude = `${rootPath}/include`;
	return `${napiInclude} ${thisInclude}`.trim();
};

// oxlint-disable-next-line no-console
export const printInclude = (): void => console.log(getInclude());
