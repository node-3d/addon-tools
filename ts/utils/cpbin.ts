import fs from 'node:fs/promises';
import { getBin } from '../include.ts';
import { copy, exists, rm } from './files.ts';
import { getLogger } from './logger.ts';

const logger = getLogger('addon-tools');

export const cpbin = async (name: string): Promise<void> => {
	const srcDir = process.cwd().replaceAll('\\', '/');

	if (!(await exists(`${srcDir}/build/Release/${name}.node`))) {
		logger.error(`Error. File "${srcDir}/build/Release/${name}.node" not found.`);
	}

	const binAbs = `${srcDir}/../${getBin()}`;

	if (!(await exists(binAbs))) {
		await fs.mkdir(binAbs, { recursive: true });
	}

	const destAbs = `${binAbs}/${name}.node`;

	if (await exists(destAbs)) {
		await rm(destAbs);
	}

	await copy(`${srcDir}/build/Release/${name}.node`, destAbs);

	logger.log(`The binary "${name}.node" was copied to "${getBin()}".`);
};
