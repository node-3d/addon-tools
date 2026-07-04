import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import { test } from './test-addon.ts';

const int64ArgMsg = { message: 'Argument 0 must be of type `Int64`' };
const int64ArgLetMsg = { message: 'Argument 0 must be of type `Int64` or be `null`/`undefined`' };

describe('AT / HPP / REQ_INT64_ARG', () => {
	it('exports reqInt64Arg', () => {
		assert.strictEqual(typeof test.reqInt64Arg, 'function');
	});
	it('throws if arg was not passed', () => {
		assert.throws(() => test.reqInt64Arg(), int64ArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		assert.throws(() => test.reqInt64Arg(undefined), int64ArgMsg);
	});
	it('throws if arg was passed null', () => {
		assert.throws(() => test.reqInt64Arg(null), int64ArgMsg);
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.reqInt64Arg('1'), int64ArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.reqInt64Arg(true), int64ArgMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.reqInt64Arg({}), int64ArgMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.reqInt64Arg([]), int64ArgMsg);
	});
	it('accepts a number', () => {
		assert.strictEqual(test.reqInt64Arg(55), 55);
	});
});

describe('addon-tools.hpp: LET_INT64_ARG', () => {
	it('exports letInt64Arg', () => {
		assert.strictEqual(typeof test.letInt64Arg, 'function');
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.letInt64Arg('1'), int64ArgLetMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.letInt64Arg(true), int64ArgLetMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.letInt64Arg({}), int64ArgLetMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.letInt64Arg([]), int64ArgLetMsg);
	});
	it('accepts an empty arg', () => {
		assert.strictEqual(test.letInt64Arg(), 0);
	});
	it('accepts undefined', () => {
		assert.strictEqual(test.letInt64Arg(undefined), 0);
	});
	it('accepts null', () => {
		assert.strictEqual(test.letInt64Arg(null), 0);
	});
	it('accepts a number', () => {
		assert.strictEqual(test.letInt64Arg(55), 55);
	});
});

describe('addon-tools.hpp: USE_INT64_ARG', () => {
	it('exports useInt64Arg', () => {
		assert.strictEqual(typeof test.useInt64Arg, 'function');
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.useInt64Arg('1'), int64ArgLetMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.useInt64Arg(true), int64ArgLetMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.useInt64Arg({}), int64ArgLetMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.useInt64Arg([]), int64ArgLetMsg);
	});
	it('accepts an empty arg', () => {
		assert.strictEqual(test.useInt64Arg(), 10);
	});
	it('accepts undefined', () => {
		assert.strictEqual(test.useInt64Arg(undefined), 10);
	});
	it('accepts null', () => {
		assert.strictEqual(test.useInt64Arg(null), 10);
	});
	it('accepts a number', () => {
		assert.strictEqual(test.useInt64Arg(55), 55);
	});
});

describe('addon-tools.hpp: WEAK_INT64_ARG', () => {
	it('exports weakInt64Arg', () => {
		assert.strictEqual(typeof test.weakInt64Arg, 'function');
	});
	it('ok if arg was passed a string', () => {
		assert.strictEqual(test.weakInt64Arg('1'), 1);
	});
	it('ok if arg was passed a number', () => {
		assert.strictEqual(test.weakInt64Arg(1), 1);
	});
	it('ok if arg was passed an object', () => {
		assert.strictEqual(test.weakInt64Arg({}), 0);
	});
	it('ok if arg was passed an array', () => {
		assert.strictEqual(test.weakInt64Arg([]), 0);
	});
	it('accepts an empty arg', () => {
		assert.strictEqual(test.weakInt64Arg(), 0);
	});
	it('accepts undefined', () => {
		assert.strictEqual(test.weakInt64Arg(undefined), 0);
	});
	it('accepts null', () => {
		assert.strictEqual(test.weakInt64Arg(null), 0);
	});
	it('accepts a boolean', () => {
		assert.strictEqual(test.weakInt64Arg(true), 1);
	});
});
