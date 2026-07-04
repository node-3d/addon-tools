import fs from 'node:fs/promises';
import { getLogger } from './logger.ts';

const logger = getLogger('addon-tools');

export const copy = async (src: string, dest: string): Promise<void> => {
	try {
		await fs.copyFile(src, dest);
	} catch (error) {
		if (!(error instanceof Error && 'code' in error && error.code === 'EBUSY')) {
			logger.warn('WARNING\n', error);
		}
	}
};

export const exists = async (name: string): Promise<boolean> => {
	try {
		await fs.access(name);
		return true;
	} catch {
		return false;
	}
};

export const ensuredir = async (dir: string): Promise<void> => {
	if (!dir) {
		return;
	}
	await fs.mkdir(dir, { recursive: true });
};

export const subdirs = async (name: string): Promise<string[]> => {
	const all = await fs.readdir(name, { withFileTypes: true });
	return all.filter((dirent) => dirent.isDirectory()).map((dirent) => dirent.name);
};

export const subfiles = async (name: string): Promise<string[]> => {
	const all = await fs.readdir(name, { withFileTypes: true });
	return all.filter((dirent) => dirent.isFile()).map((dirent) => `${name}/${dirent.name}`);
};

export const traverse = async (name: string, showDirs = false): Promise<string[]> => {
	const subdirNames = await subdirs(name);
	const dirs = subdirNames.map((dir) => `${name}/${dir}`);
	const nestedItems = await Promise.all(dirs.map((dir) => traverse(dir, showDirs)));
	const nested = nestedItems.flat();
	const files = await subfiles(name);
	return [...(showDirs ? dirs : []), ...nested, ...files];
};

export const rmdir = async (name: string): Promise<void> => {
	if (await exists(name)) {
		await fs.rm(name, { recursive: true });
	}
};

export const rm = async (name: string): Promise<void> => {
	if (await exists(name)) {
		await fs.rm(name);
	}
};
