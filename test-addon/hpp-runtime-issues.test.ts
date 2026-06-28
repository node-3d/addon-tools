import { strict as assert } from 'node:assert';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { describe, it } from 'node:test';

import { test } from './test-addon.ts';


describe('addon-tools.hpp: ES5 wrappers', () => {
	it('exports CrashProbe', () => {
		assert.strictEqual(typeof test.CrashProbe, 'function');
		assert.strictEqual(new test.CrashProbe().ping(), 123);
	});

	it('should throw a JS error instead of crashing on invalid `this`', () => {
		const result = spawnSync(
			process.execPath,
			[path.join(import.meta.dirname, 'repros', 'es5-invalid-this.ts')],
			{ encoding: 'utf8' },
		);

		assert.strictEqual(
			result.status,
			0,
			[
				`status=${result.status}`,
				`signal=${result.signal}`,
				`stdout=${result.stdout}`,
				`stderr=${result.stderr}`,
			].join('\n'),
		);
	});
});


describe('addon-tools.hpp: strcasestr_crossplatform helper', () => {
	const run = process.platform === 'win32' ? it : it.skip;

	run('should not mutate either input buffer', () => {
		const result = test.strcasestrProbe();

		assert.deepStrictEqual(result, {
			haystack: 'AbCdEf',
			needle: 'Cd',
			index: 2,
		});
	});
});


describe('addon-tools.hpp: typed data helpers', () => {
	it('should reject reinterpreting a Uint8Array as uint32_t data', () => {
		const base = new Uint32Array(4);
		const alignedView = new Uint8Array(base.buffer, 0, 4);
		const misalignedView = new Uint8Array(base.buffer, 1, 4);

		assert.deepStrictEqual(test.getArrayDataUint32Meta(alignedView), {
			count: 1,
			alignment: 0,
		});
		assert.throws(
			() => test.getArrayDataUint32Meta(misalignedView),
			{ message: 'Array data is not properly aligned for the requested type.' },
		);
	});
});


describe('addon-tools.hpp: getData fallback behavior', () => {
	it('should return false when `.data` throws during lookup', () => {
		const tricky = new Proxy({}, {
			has(_target, key) {
				return key === 'data';
			},
			get(_target, key) {
				if (key === 'data') {
					throw new Error('getter exploded');
				}
				return undefined;
			},
		});

		assert.strictEqual(test.getDataPresence(tricky), false);
	});
});
