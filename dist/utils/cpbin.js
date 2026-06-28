import promises from "node:fs/promises";
import { getBin } from "../include.js";
import { copy, exists, rm } from "./files.js";
import { getLogger } from "./logger.js";
const logger = getLogger('addon-tools');
const cpbin = async (name)=>{
    const srcDir = process.cwd().replaceAll('\\', '/');
    if (!await exists(`${srcDir}/build/Release/${name}.node`)) logger.error(`Error. File "${srcDir}/build/Release/${name}.node" not found.`);
    const binAbs = `${srcDir}/../${getBin()}`;
    if (!await exists(binAbs)) await promises.mkdir(binAbs, {
        recursive: true
    });
    const destAbs = `${binAbs}/${name}.node`;
    if (await exists(destAbs)) await rm(destAbs);
    await copy(`${srcDir}/build/Release/${name}.node`, destAbs);
    logger.log(`The binary "${name}.node" was copied to "${getBin()}".`);
};
export { cpbin };
