import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';

import {
	getInstallCandidateEnvName,
	getInstallCandidateUrl,
	getPlatform,
} from '@node-3d/addon-tools';

const require = createRequire(import.meta.url);
const consumer = require('./build/Release/consumer.node') as { ping: () => number };

test('packed public entry exposes install candidate helpers', () => {
	assert.equal(typeof getPlatform(), 'string');
	assert.equal(
		getInstallCandidateEnvName('@node-3d/steam-api'),
		'NODE_3D_INSTALL_NODE_3D_STEAM_API',
	);
	assert.equal(getInstallCandidateUrl('@node-3d/addon-tools'), undefined);
});

test('packed headers build a loadable addon', () => {
	assert.equal(consumer.ping(), 123);
});
