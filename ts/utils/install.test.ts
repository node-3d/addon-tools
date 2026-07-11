import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import { exists, getBin, getPlatform, install } from '../index.ts';

const prefix = 'https://github.com/node-3d/segfault/releases/download';
const tag = '2.3.0';
const isOSX = getPlatform() === 'osx';

describe(
	'AT / Install',
	{ skip: isOSX ? 'segfault osx binary is not available in this CI path' : false },
	async () => {
		if (isOSX) {
			return;
		}

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
	},
);
