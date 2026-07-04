import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import { download } from '../ts/index.ts';

const url = 'https://raw.githubusercontent.com/node-3d/image/refs/tags/4.3.0/test/freeimage.jpg';

describe('AT / Download', async () => {
	const data = await download(url);

	it('data is Buffer', () => {
		assert.strictEqual(data?.constructor, Buffer);
	});

	it('downloaded byte count is correct', () => {
		assert.strictEqual(data?.length, 7972);
	});
});
