import { copy, exists } from './files.ts';
import { getLogger } from './logger.ts';

const logger = getLogger('addon-tools');

export const cpcpplint = async (): Promise<void> => {
	const cpplintDest = `${process.cwd()}/CPPLINT.cfg`.replaceAll('\\', '/');
	const cpplintSrc = `${import.meta.dirname}/../../utils/CPPLINT.cfg`.replaceAll('\\', '/');
	
	if (!await exists(cpplintSrc)) {
		logger.error('Error. File "CPPLINT.cfg" not found.');
		return;
	}
	
	if (await exists(cpplintDest)) {
		logger.warn('Warning. Dest "CPPLINT.cfg" exists and will be overwritten.');
	}
	
	await copy(cpplintSrc, cpplintDest);
	
	logger.log(`"CPPLINT.cfg" was copied to "${cpplintDest}".`);
};
