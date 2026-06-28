import { exec } from "node:child_process";
import promises from "node:fs/promises";
import { promisify } from "node:util";
import { getBin, getPlatform } from "../include.js";
import { exists, rm, rmdir } from "./files.js";
import { getLogger } from "./logger.js";
const install_exec = promisify(exec);
const logger = getLogger('addon-tools');
const download = async (url)=>{
    const { stderr } = await install_exec([
        'curl -sL -o',
        `${getBin()}/${getPlatform()}.gz`,
        url
    ].join(' '));
    if (stderr) logger.warn(stderr);
};
const unpack = async (gzPath, binPath)=>{
    const { stderr } = await install_exec(`tar -xzf ${gzPath} --directory ${binPath}`);
    if (stderr) logger.warn(stderr);
};
const install = async (folderUrl)=>{
    const binPath = getBin();
    const urlPath = `${folderUrl}/${getPlatform()}.gz`;
    const gzPath = `${binPath}/${getPlatform()}.gz`;
    await rmdir(binPath);
    await promises.mkdir(binPath, {
        recursive: true
    });
    try {
        await download(urlPath);
        if (!await exists(gzPath)) {
            logger.warn(`Could not download "${urlPath}" to "${gzPath}"`);
            return false;
        }
        await unpack(gzPath, binPath);
    } catch (error) {
        logger.warn(error);
        return false;
    }
    await rm(gzPath);
    return true;
};
export { install };
