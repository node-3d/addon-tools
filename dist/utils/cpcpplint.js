import { copy, exists } from "./files.js";
import { getLogger } from "./logger.js";
const logger = getLogger('addon-tools');
const cpcpplint = async ()=>{
    const cpplintDest = `${process.cwd()}/CPPLINT.cfg`.replaceAll('\\', '/');
    const cpplintSrc = `${import.meta.dirname}/../../utils/CPPLINT.cfg`.replaceAll('\\', '/');
    if (!await exists(cpplintSrc)) return void logger.error('Error. File "CPPLINT.cfg" not found.');
    if (await exists(cpplintDest)) logger.warn('Warning. Dest "CPPLINT.cfg" exists and will be overwritten.');
    await copy(cpplintSrc, cpplintDest);
    logger.log(`"CPPLINT.cfg" was copied to "${cpplintDest}".`);
};
export { cpcpplint };
