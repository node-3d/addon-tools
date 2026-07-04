// oxlint-disable node/no-sync
import { readFileSync } from 'node:fs';
import path from 'node:path';

const normalize = (text: string) => text.replaceAll('\r\n', '\n');

export const checkGypi = (localPath = 'src/common.gypi'): void => {
	const canonicalPath = path.join(import.meta.dirname, '../../utils/common.gypi');
	const local = normalize(readFileSync(localPath, 'utf8'));
	const canonical = normalize(readFileSync(canonicalPath, 'utf8'));

	if (local !== canonical) {
		throw new Error(`${localPath} does not match ${canonicalPath}`);
	}
};
