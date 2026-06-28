import { promisify } from 'node:util';
import { exec as execCallback } from 'node:child_process';
import { getBin, getPlatform } from '../include.ts';
import { getLogger } from './logger.ts';

const exec = promisify(execCallback);
const logger = getLogger('addon-tools');

export const actionPack = async (): Promise<void> => {
	try {
		await exec(`cd ${getBin()} && tar -czf ../${getPlatform()}.gz *`);
		logger.log(`pack=${getPlatform()}.gz`);
	} catch (error) {
		logger.error(error);
		process.exitCode = 1;
	}
};
