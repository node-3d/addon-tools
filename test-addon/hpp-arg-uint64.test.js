'use strict';

const assert = require('node:assert').strict;
const { describe, it } = require('node:test');

const test = require('./build/Release/test.node');


const uint64ArgMsg = { message: 'Argument 0 must be of type `Uint64`' };
const uint64ArgLetMsg = { message: 'Argument 0 must be of type `Uint64` or be `null`/`undefined`' };

describe('AT / HPP / REQ_UINT64_ARG', () => {
	it('exports reqUint64Arg', () => {
		assert.strictEqual(typeof test.reqUint64Arg, 'function');
	});
	it('throws if arg was not passed', () => {
		assert.throws(() => test.reqUint64Arg(), uint64ArgMsg);
	});
	it('throws if arg was passed undefined', () => {
		assert.throws(() => test.reqUint64Arg(undefined), uint64ArgMsg);
	});
	it('throws if arg was passed null', () => {
		assert.throws(() => test.reqUint64Arg(null), uint64ArgMsg);
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.reqUint64Arg('1'), uint64ArgMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.reqUint64Arg(true), uint64ArgMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.reqUint64Arg({}), uint64ArgMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.reqUint64Arg([]), uint64ArgMsg);
	});
	it('accepts a number', () => {
		assert.strictEqual(test.reqUint64Arg(55), 55);
	});
});

describe('addon-tools.hpp: LET_UINT64_ARG', () => {
	it('exports letUint64Arg', () => {
		assert.strictEqual(typeof test.letUint64Arg, 'function');
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.letUint64Arg('1'), uint64ArgLetMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.letUint64Arg(true), uint64ArgLetMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.letUint64Arg({}), uint64ArgLetMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.letUint64Arg([]), uint64ArgLetMsg);
	});
	it('accepts an empty arg', () => {
		assert.strictEqual(test.letUint64Arg(), 0);
	});
	it('accepts undefined', () => {
		assert.strictEqual(test.letUint64Arg(undefined), 0);
	});
	it('accepts null', () => {
		assert.strictEqual(test.letUint64Arg(null), 0);
	});
	it('accepts a number', () => {
		assert.strictEqual(test.letUint64Arg(55), 55);
	});
});

describe('addon-tools.hpp: USE_UINT64_ARG', () => {
	it('exports useUint64Arg', () => {
		assert.strictEqual(typeof test.useUint64Arg, 'function');
	});
	it('throws if arg was passed a string', () => {
		assert.throws(() => test.useUint64Arg('1'), uint64ArgLetMsg);
	});
	it('throws if arg was passed a boolean', () => {
		assert.throws(() => test.useUint64Arg(true), uint64ArgLetMsg);
	});
	it('throws if arg was passed an object', () => {
		assert.throws(() => test.useUint64Arg({}), uint64ArgLetMsg);
	});
	it('throws if arg was passed an array', () => {
		assert.throws(() => test.useUint64Arg([]), uint64ArgLetMsg);
	});
	it('accepts an empty arg', () => {
		assert.strictEqual(test.useUint64Arg(), 10);
	});
	it('accepts undefined', () => {
		assert.strictEqual(test.useUint64Arg(undefined), 10);
	});
	it('accepts null', () => {
		assert.strictEqual(test.useUint64Arg(null), 10);
	});
	it('accepts a number', () => {
		assert.strictEqual(test.useUint64Arg(55), 55);
	});
});

describe('addon-tools.hpp: WEAK_UINT64_ARG', () => {
	it('exports weakUint64Arg', () => {
		assert.strictEqual(typeof test.weakUint64Arg, 'function');
	});
	it('ok if arg was passed a string', () => {
		assert.strictEqual(test.weakUint64Arg('1'), 1);
	});
	it('ok if arg was passed a number', () => {
		assert.strictEqual(test.weakUint64Arg(1), 1);
	});
	it('ok if arg was passed an object', () => {
		assert.strictEqual(test.weakUint64Arg({}), 0);
	});
	it('ok if arg was passed an array', () => {
		assert.strictEqual(test.weakUint64Arg([]), 0);
	});
	it('accepts an empty arg', () => {
		assert.strictEqual(test.weakUint64Arg(), 0);
	});
	it('accepts undefined', () => {
		assert.strictEqual(test.weakUint64Arg(undefined), 0);
	});
	it('accepts null', () => {
		assert.strictEqual(test.weakUint64Arg(null), 0);
	});
	it('accepts a boolean', () => {
		assert.strictEqual(test.weakUint64Arg(true), 1);
	});
});
