import { promisify } from 'node:util';
import { exec as execCallback } from 'node:child_process';
import fs from 'node:fs/promises';
import { getBin, getPlatform } from '../include.ts';
import { getLogger } from './logger.ts';

const exec = promisify(execCallback);
const logger = getLogger('addon-tools');

const removeDownloadedArchives = async (binPath: string): Promise<void> => {
	const files = await fs.readdir(binPath);
	await Promise.all(
		files
			.filter((file) => file.endsWith('.gz'))
			.map((file) => fs.rm(`${binPath}/${file}`, { force: true })),
	);
};

export const actionPack = async (): Promise<void> => {
	try {
		const binPath = getBin();
		await removeDownloadedArchives(binPath);
		await exec(`cd ${binPath} && tar -czf ../${getPlatform()}.gz *`);
		logger.log(`pack=${getPlatform()}.gz`);
	} catch (error) {
		logger.error(error);
		process.exitCode = 1;
	}
};
