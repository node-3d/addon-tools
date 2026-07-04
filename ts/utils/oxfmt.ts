import { defineConfig } from 'oxfmt';
import type { Oxfmtrc } from 'oxfmt';

const config: Oxfmtrc = {
	useTabs: true,
	tabWidth: 4,
	singleQuote: true,
	jsxSingleQuote: true,
	ignorePatterns: [
		'**/node_modules/**',
		'**/dist/**',
		'**/bin/**',
		'**/bin-*',
		'**/src/build/**',
		'**/src/build-*',
		'**/*.d.ts',
		'**/examples/qt-calqlatr/calqlatr/content/calculator.js',
		'**/ThemedUi/default-theme.js',
		'**/examples/qml/themes/themes.js',
	],
};

export default defineConfig(config);
