import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import { test } from './test-addon.ts';

describe('addon-tools.hpp: getBufferData', () => {
	it('reads float data from a Buffer', () => {
		const buffer = Buffer.allocUnsafe(8);
		buffer.writeFloatLE(1.5, 0);
		buffer.writeFloatLE(2.5, 4);

		assert.deepStrictEqual(test.getBufferDataFloatMeta(buffer), {
			count: 2,
			first: 1.5,
		});
	});

	it('writes float data through the mutable helper', () => {
		const buffer = Buffer.allocUnsafe(8);
		buffer.writeFloatLE(1.5, 0);
		buffer.writeFloatLE(2.5, 4);

		assert.strictEqual(test.setBufferDataFloatFirst(buffer, 9.25), 9.25);
		assert.strictEqual(buffer.readFloatLE(0), 9.25);
	});

	it('throws if the buffer is smaller than one float', () => {
		assert.throws(() => test.getBufferDataFloatMeta(Buffer.from([1, 2, 3])), {
			message: 'Buffer does not contain a complete item of the requested type.',
		});
	});

	it('throws if the buffer length is not a whole number of floats', () => {
		assert.throws(() => test.getBufferDataFloatMeta(Buffer.allocUnsafe(6)), {
			message: 'Buffer byte length must be a multiple of the requested type size.',
		});
	});

	it('throws on a misaligned Buffer view', () => {
		const base = new Float32Array([1.5, 2.5, 3.5, 4.5]);
		const alignedView = Buffer.from(base.buffer, 0, 8);
		const misalignedView = Buffer.from(base.buffer, 1, 8);

		assert.deepStrictEqual(test.getBufferDataFloatMeta(alignedView), {
			count: 2,
			first: 1.5,
		});
		assert.throws(() => test.getBufferDataFloatMeta(misalignedView), {
			message: 'Buffer data is not properly aligned for the requested type.',
		});
	});
});
