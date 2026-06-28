import { strict as assert } from 'node:assert';
import { after, before, describe, it } from 'node:test';

import { test } from './test-addon.ts';
import { createLogger } from '../ts/index.ts';


describe('AT / HPP / Console Log', () => {
	let logged = '';
	
	const logOld = console.log;
	before(() => {
		console.log = (...args) => {
			logged += `${args.join(',')}.`;
		};
	});
	after(() => {
		console.log = logOld;
	});
	
	it('logged string to console from cpp', () => {
		test.consoleLogString();
		assert.strictEqual(logged, 'test.');
	});
	
	it('logged args to console from cpp', () => {
		logged = '';
		test.consoleLogArgs();
		assert.strictEqual(logged, 'test,2.');
	});
});

describe('AT / HPP / Global Log', () => {
	let logged = '';
	const fn = (level: string) => (...args: unknown[]) => {
		logged += `${level}:${args.join(',')}.`;
	};
	createLogger({
		name: 'cpp',
		debug: fn('debug'),
		log: fn('log'),
		info: fn('info'),
		warn: fn('warn'),
		error: fn('error'),
	});
	
	it('logged string to global logger from cpp', () => {
		test.globalLogString();
		assert.strictEqual(logged, 'info:test.');
	});
	
	it('logged args to global logger from cpp', () => {
		logged = '';
		test.globalLogArgs();
		assert.strictEqual(logged, 'warn:test,2.');
	});
});
