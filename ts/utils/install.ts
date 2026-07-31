import { execFile as execFileCallback } from 'node:child_process';
import fs from 'node:fs/promises';
import { setTimeout } from 'node:timers/promises';
import { promisify } from 'node:util';
import { getBin, getPlatform } from '../include.ts';
import { exists, rm, rmdir } from './files.ts';
import { getLogger } from './logger.ts';

const execFile = promisify(execFileCallback);
const logger = getLogger('addon-tools');
const ONE_SECOND_MS = 1000;
const RETRY_DELAYS_MS = [ONE_SECOND_MS * 2, ONE_SECOND_MS * 5] as const;

const download = async (url: string, gzPath: string) => {
	const { stderr } = await execFile('curl', ['-fsSL', '-o', gzPath, url]);
	if (stderr) {
		logger.warn(stderr);
	}
};

const unpack = async (gzPath: string, binPath: string) => {
	const { stderr } = await execFile('tar', ['-xzf', gzPath, '--directory', binPath]);
	if (stderr) {
		logger.warn(stderr);
	}
};

const waitBeforeRetry = async (attempt: number): Promise<void> => {
	const delayMs = RETRY_DELAYS_MS[attempt - 1] ?? RETRY_DELAYS_MS.at(-1);
	if (delayMs) {
		await setTimeout(delayMs);
	}
};

const tryInstall = async (urlPath: string, gzPath: string, binPath: string): Promise<boolean> => {
	await download(urlPath, gzPath);

	if (!(await exists(gzPath))) {
		throw new Error(`Could not download "${urlPath}" to "${gzPath}"`);
	}

	await unpack(gzPath, binPath);
	return true;
};

export const install = async (folderUrl: string): Promise<boolean> => {
	const binPath = getBin();
	const urlPath = `${folderUrl}/${getPlatform()}.gz`;
	const gzPath = `${binPath}/${getPlatform()}.gz`;

	await rmdir(binPath);
	await fs.mkdir(binPath, { recursive: true });

	// oxlint-disable no-await-in-loop
	for (let attempt = 1; attempt <= RETRY_DELAYS_MS.length + 1; attempt++) {
		try {
			const isInstalled = await tryInstall(urlPath, gzPath, binPath);
			await rm(gzPath).catch((rmError: unknown) => logger.warn(rmError));
			return isInstalled;
		} catch (error) {
			logger.warn(error);
			await rm(gzPath).catch((rmError: unknown) => logger.warn(rmError));

			if (attempt > RETRY_DELAYS_MS.length) {
				return false;
			}

			logger.warn(
				`Retrying install from "${urlPath}" (${attempt}/${RETRY_DELAYS_MS.length})`,
			);
			await waitBeforeRetry(attempt);
		}
	}
	// oxlint-enable no-await-in-loop

	return false;
};
