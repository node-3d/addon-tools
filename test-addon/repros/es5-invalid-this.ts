import { test } from '../test-addon.ts';

try {
	(test.CrashProbe.prototype as { ping: () => number }).ping.call({});
	process.exitCode = 2;
} catch (error) {
	console.log(error instanceof Error ? error.message : String(error));
	process.exitCode = 0;
}
