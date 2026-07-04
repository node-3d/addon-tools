import { exec as execCallback } from 'node:child_process';
import fs from 'node:fs/promises';
import { promisify } from 'node:util';
import { getBin, getPlatform } from '../include.ts';
import { exists, rm, rmdir } from './files.ts';
import { getLogger } from './logger.ts';

const exec = promisify(execCallback);
const logger = getLogger('addon-tools');

const download = async (url: string) => {
	const { stderr } = await exec(
		['curl -sL -o', `${getBin()}/${getPlatform()}.gz`, url].join(' '),
	);
	if (stderr) {
		logger.warn(stderr);
	}
};

const unpack = async (gzPath: string, binPath: string) => {
	const { stderr } = await exec(`tar -xzf ${gzPath} --directory ${binPath}`);
	if (stderr) {
		logger.warn(stderr);
	}
};

export const install = async (folderUrl: string): Promise<boolean> => {
	const binPath = getBin();
	const urlPath = `${folderUrl}/${getPlatform()}.gz`;
	const gzPath = `${binPath}/${getPlatform()}.gz`;

	await rmdir(binPath);
	await fs.mkdir(binPath, { recursive: true });

	try {
		await download(urlPath);

		if (!(await exists(gzPath))) {
			logger.warn(`Could not download "${urlPath}" to "${gzPath}"`);
			return false;
		}

		await unpack(gzPath, binPath);
	} catch (error) {
		logger.warn(error);
		return false;
	}
	await rm(gzPath);
	return true;
};
