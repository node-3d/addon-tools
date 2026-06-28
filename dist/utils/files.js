import promises from "node:fs/promises";
import { getLogger } from "./logger.js";
const logger = getLogger('addon-tools');
const copy = async (src, dest)=>{
    try {
        await promises.copyFile(src, dest);
    } catch (error) {
        if (!(error instanceof Error && 'code' in error && 'EBUSY' === error.code)) logger.warn('WARNING\n', error);
    }
};
const exists = async (name)=>{
    try {
        await promises.access(name);
        return true;
    } catch  {
        return false;
    }
};
const ensuredir = async (dir)=>{
    if (!dir) return;
    await promises.mkdir(dir, {
        recursive: true
    });
};
const subdirs = async (name)=>{
    const all = await promises.readdir(name, {
        withFileTypes: true
    });
    return all.filter((dirent)=>dirent.isDirectory()).map((dirent)=>dirent.name);
};
const subfiles = async (name)=>{
    const all = await promises.readdir(name, {
        withFileTypes: true
    });
    return all.filter((dirent)=>dirent.isFile()).map((dirent)=>`${name}/${dirent.name}`);
};
const traverse = async (name, showDirs = false)=>{
    const subdirNames = await subdirs(name);
    const dirs = subdirNames.map((dir)=>`${name}/${dir}`);
    const nestedItems = await Promise.all(dirs.map((dir)=>traverse(dir, showDirs)));
    const nested = nestedItems.flat();
    const files = await subfiles(name);
    return [
        ...showDirs ? dirs : [],
        ...nested,
        ...files
    ];
};
const rmdir = async (name)=>{
    if (await exists(name)) await promises.rm(name, {
        recursive: true
    });
};
const rm = async (name)=>{
    if (await exists(name)) await promises.rm(name);
};
export { copy, ensuredir, exists, rm, rmdir, subdirs, subfiles, traverse };
