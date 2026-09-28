// oxlint-disable node/no-top-level-await
import { runNpm } from '../run-npm.ts';

// oxlint-disable-next-line node/no-process-env
const environment = process.env;

const getRequiredEnv = (name: string): string => {
	const value = environment[name];
	if (!value) {
		throw new Error(`Missing required environment variable: ${name}`);
	}
	return value;
};

const main = async () =>
	runNpm(['install', getRequiredEnv('NODE_3D_PACKAGE_TARBALL')], {
		cwd: getRequiredEnv('NODE_3D_CONSUMER_DIRECTORY'),
	});

await main();
