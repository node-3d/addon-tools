'use strict';

const addon = require('../build/Release/test.node');

try {
	addon.CrashProbe.prototype.ping.call({});
	process.exitCode = 2;
} catch (error) {
	console.log(error && error.message ? error.message : String(error));
	process.exitCode = 0;
}
