import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import * as utils from '../ts/index.ts';

describe('AT / Util Exports', () => {
	const methods = [
		'install',
		'cpbin',
		'download',
		'copy',
		'exists',
		'ensuredir',
		'subdirs',
		'subfiles',
		'traverse',
		'rmdir',
		'rm',
		'actionPack',
		'checkGypi',
		'createLogger',
		'setLevel',
		'getLevel',
		'getLoggers',
	] as const;

	for (const name of methods) {
		it(`exports the "${name}" function`, () => {
			assert.strictEqual(typeof utils[name], 'function');
		});
	}
});
