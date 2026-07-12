import { copy, exists } from './files.ts';
import { getLogger } from './logger.ts';

const logger = getLogger('addon-tools');

export const cpclangformat = async (): Promise<void> => {
	const configDest = `${process.cwd()}/.clang-format`.replaceAll('\\', '/');
	const configSrc = `${import.meta.dirname}/../../utils/.clang-format`.replaceAll('\\', '/');

	if (!(await exists(configSrc))) {
		logger.error('Error. File ".clang-format" not found.');
		return;
	}

	await copy(configSrc, configDest);

	logger.log(`".clang-format" was copied to "${configDest}".`);
};
