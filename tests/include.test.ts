import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import * as tools from '../ts/index.ts';

describe('AT / Include', () => {
	const stringMethods = ['getBin', 'getPlatform', 'getInclude'] as const;
	const printMethods = ['printBin', 'printPlatform', 'printInclude'] as const;

	for (const name of stringMethods) {
		describe(`#${name}()`, () => {
			it('is a function', () => {
				assert.strictEqual(typeof tools[name], 'function');
			});

			it('returns an object', () => {
				assert.strictEqual(typeof tools[name](), 'string');
			});
		});
	}

	for (const name of printMethods) {
		describe(`#${name}()`, () => {
			it('is a function', () => {
				assert.strictEqual(typeof tools[name], 'function');
			});
		});
	}

	describe('#getPaths()', () => {
		it('is a function', () => {
			assert.strictEqual(typeof tools.getPaths, 'function');
		});

		it('returns an object', () => {
			assert.strictEqual(typeof tools.getPaths(import.meta.dirname), 'object');
		});

		it('has "include" string', () => {
			assert.strictEqual(typeof tools.getPaths(import.meta.dirname).include, 'string');
		});

		it('has "bin" string', () => {
			assert.strictEqual(typeof tools.getPaths(import.meta.dirname).bin, 'string');
		});
	});
});
