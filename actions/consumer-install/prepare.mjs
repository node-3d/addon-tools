// oxlint-disable node/no-top-level-await
import { appendFile, cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

import { getInstallCandidateEnvName } from '../../ts/utils/install.ts';

// oxlint-disable-next-line node/no-process-env
const environment = process.env;
const runnerTemp = environment.RUNNER_TEMP ?? tmpdir();
const consumerDirectory = path.join(runnerTemp, 'node-3d-consumer');
const packageDirectory = path.join(runnerTemp, 'node-3d-package-candidate');
const binaryDirectory = path.join(runnerTemp, 'node-3d-binary-candidate');

const main = async () => {
	await rm(consumerDirectory, { force: true, recursive: true });
	await mkdir(consumerDirectory, { recursive: true });

	if (environment.NODE_3D_FIXTURE) {
		const fixtureDirectory = path.resolve(
			environment.GITHUB_WORKSPACE,
			environment.NODE_3D_FIXTURE,
		);
		await cp(fixtureDirectory, consumerDirectory, { recursive: true });
	}

	const packageJsonPath = path.join(consumerDirectory, 'package.json');
	try {
		await readFile(packageJsonPath);
	} catch {
		await writeFile(
			packageJsonPath,
			`${JSON.stringify({ name: 'node-3d-consumer', private: true, type: 'module' }, null, 2)}\n`,
		);
	}

	const files = await readdir(packageDirectory);
	const tarballs = files.filter((file) => file.endsWith('.tgz'));
	if (tarballs.length !== 1) {
		throw new Error(`Expected one npm tarball, found ${tarballs.length}`);
	}

	if (environment.NODE_3D_BINARY_ARTIFACT) {
		const envName = getInstallCandidateEnvName(environment.NODE_3D_PACKAGE_NAME);
		const candidateUrl = pathToFileURL(binaryDirectory).href;
		await appendFile(environment.GITHUB_ENV, `${envName}=${candidateUrl}\n`);
	}

	await appendFile(
		environment.GITHUB_OUTPUT,
		`directory=${consumerDirectory}\ntarball=${path.join(packageDirectory, tarballs[0])}\n`,
	);
};

await main();
