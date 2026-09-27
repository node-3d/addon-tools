// oxlint-disable node/no-top-level-await
import { runNpm } from '../run-npm.mjs';

// oxlint-disable-next-line node/no-process-env
const environment = process.env;

const main = async () =>
	runNpm(['install', environment.NODE_3D_PACKAGE_TARBALL], {
		cwd: environment.NODE_3D_CONSUMER_DIRECTORY,
	});

await main();
