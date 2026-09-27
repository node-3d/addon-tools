// oxlint-disable node/no-top-level-await
import { appendFile, mkdtemp, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { runNpm } from '../run-npm.mjs';

// oxlint-disable-next-line node/no-process-env
const environment = process.env;

const main = async () => {
	const destination = await mkdtemp(path.join(tmpdir(), 'node-3d-npm-candidate-'));
	await runNpm(['pack', '--pack-destination', destination, '--silent']);

	const files = await readdir(destination);
	const tarballs = files.filter((file) => file.endsWith('.tgz'));
	if (tarballs.length !== 1) {
		throw new Error(`Expected one npm tarball, found ${tarballs.length}`);
	}

	const tarball = path.join(destination, tarballs[0]);
	await appendFile(environment.GITHUB_OUTPUT, `tarball=${tarball}\n`);
};

await main();
