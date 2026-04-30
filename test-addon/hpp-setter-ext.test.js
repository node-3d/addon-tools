'use strict';

const assert = require('node:assert').strict;
const { describe, it } = require('node:test');

const test = require('./build/Release/test.node');


describe('addon-tools.hpp: SETTER_EXT_ARG', () => {
	it('round-trips a non-null external pointer', () => {
		const value = test.setterExtRoundTrip(test.retExtNonNull());

		assert.strictEqual(typeof value, 'object');
	});

	it('round-trips a null external pointer', () => {
		const value = test.setterExtRoundTrip(test.retExt());

		assert.strictEqual(typeof value, 'object');
	});

	it('rejects non-external values', () => {
		assert.throws(() => {
			test.setterExtRoundTrip(1);
		}, { message: 'Value must be Pointer' });
	});
});
