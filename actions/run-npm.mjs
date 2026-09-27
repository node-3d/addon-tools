import { spawn } from 'node:child_process';

// oxlint-disable-next-line node/no-process-env
const environment = process.env;

export const runNpm = async (args, options = {}) => {
	const isWindows = process.platform === 'win32';
	const command = isWindows ? (environment.ComSpec ?? 'cmd.exe') : 'npm';
	const commandArgs = isWindows ? ['/d', '/s', '/c', 'npm.cmd', ...args] : args;

	await new Promise((res, rej) => {
		const child = spawn(command, commandArgs, { ...options, stdio: 'inherit' });
		child.once('error', rej);
		child.once('exit', (code, signal) => {
			if (code === 0) {
				res();
				return;
			}
			rej(new Error(`${command} exited with code ${code} and signal ${signal}`));
		});
	});
};
