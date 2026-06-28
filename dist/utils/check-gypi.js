import { readFileSync } from "node:fs";
import node_path from "node:path";
const normalize = (text)=>text.replaceAll('\r\n', '\n');
const checkGypi = (localPath = 'src/common.gypi')=>{
    const canonicalPath = node_path.join(import.meta.dirname, '../../utils/common.gypi');
    const local = normalize(readFileSync(localPath, 'utf8'));
    const canonical = normalize(readFileSync(canonicalPath, 'utf8'));
    if (local !== canonical) throw new Error(`${localPath} does not match ${canonicalPath}`);
};
export { checkGypi };
