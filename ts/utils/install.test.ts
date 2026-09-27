import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import {
	exists,
	getBin,
	getInstallCandidateEnvName,
	getInstallCandidateUrl,
	install,
} from '../index.ts';

const prefix = 'https://github.com/node-3d/segfault/releases/download';
const tag = '4.0.0';
// oxlint-disable-next-line node/no-process-env
const environment = process.env;

describe('AT / Install', async () => {
	const status = await install(`${prefix}/${tag}`);
	const rootPath = `${import.meta.dirname}/../..`;

	it('status is true', () => {
		assert.strictEqual(status, true);
	});

	it('platform folder exists', async () => {
		const isFolderCreated = await exists(`${rootPath}/${getBin()}`);
		assert.strictEqual(isFolderCreated, true);
	});

	it('platform binary exists', async () => {
		const isAddonAvailable = await exists(`${rootPath}/${getBin()}/segfault.node`);
		assert.strictEqual(isAddonAvailable, true);
	});
});

describe('AT / Install candidate environment', () => {
	it('derives a portable name from a scoped npm package', () => {
		assert.strictEqual(
			getInstallCandidateEnvName('@node-3d/steam-api'),
			'NODE_3D_INSTALL_NODE_3D_STEAM_API',
		);
	});

	it('normalizes unscoped package punctuation', () => {
		assert.strictEqual(
			getInstallCandidateEnvName('example.package-name'),
			'NODE_3D_INSTALL_EXAMPLE_PACKAGE_NAME',
		);
	});

	it('rejects a package name without letters or numbers', () => {
		assert.throws(() => getInstallCandidateEnvName('@/-'), TypeError);
	});

	it('reads the candidate URL from the derived environment name', () => {
		const envName = getInstallCandidateEnvName('@node-3d/steam-api');
		const previousValue = environment[envName];

		try {
			environment[envName] = 'file:///tmp/steam-api-candidate';
			assert.strictEqual(
				getInstallCandidateUrl('@node-3d/steam-api'),
				'file:///tmp/steam-api-candidate',
			);
		} finally {
			if (previousValue === undefined) {
				Reflect.deleteProperty(environment, envName);
			} else {
				environment[envName] = previousValue;
			}
		}
	});
});
