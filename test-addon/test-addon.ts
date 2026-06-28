import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

// The native test addon exposes many C++-bound test helpers dynamically.
// oxlint-disable-next-line typescript/no-explicit-any
export const test = require('./build/Release/test.node') as any;
