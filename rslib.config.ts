import { defineConfig } from '@rslib/core';

export default defineConfig({
	lib: [
		{
			format: 'esm',
			bundle: false,
			autoExtension: false,
			syntax: 'es2024',
			dts: {
				tsgo: true,
			},
			outBase: './ts',
			source: {
				entry: {
					index: ['./ts/index.ts'],
					include: ['./ts/include.ts'],
					'utils/action-pack': ['./ts/utils/action-pack.ts'],
					'utils/check-gypi': ['./ts/utils/check-gypi.ts'],
					'utils/cpbin': ['./ts/utils/cpbin.ts'],
					'utils/cpclangformat': ['./ts/utils/cpclangformat.ts'],
					'utils/cpcpplint': ['./ts/utils/cpcpplint.ts'],
					'utils/download': ['./ts/utils/download.ts'],
					'utils/files': ['./ts/utils/files.ts'],
					'utils/index': ['./ts/utils/index.ts'],
					'utils/install': ['./ts/utils/install.ts'],
					'utils/logger': ['./ts/utils/logger.ts'],
					'utils/oxfmt': ['./ts/utils/oxfmt.ts'],
					'utils/oxlint': ['./ts/utils/oxlint.ts'],
				},
				tsconfigPath: './tsconfig.build.json',
			},
			output: {
				target: 'node',
				distPath: {
					root: './dist',
				},
			},
		},
	],
});
