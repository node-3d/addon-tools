import { promisify } from "node:util";
import { exec } from "node:child_process";
import { getBin, getPlatform } from "../include.js";
import { getLogger } from "./logger.js";
const action_pack_exec = promisify(exec);
const logger = getLogger('addon-tools');
const actionPack = async ()=>{
    try {
        await action_pack_exec(`cd ${getBin()} && tar -czf ../${getPlatform()}.gz *`);
        logger.log(`pack=${getPlatform()}.gz`);
    } catch (error) {
        logger.error(error);
        process.exitCode = 1;
    }
};
export { actionPack };
