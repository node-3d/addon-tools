{
	'targets': [{
		'target_name': 'test',
		'includes': ['../utils/common.gypi'],
		'sources': [
			'test.cpp',
		],
		'include_dirs': [
			'<!@(node -e "import(\'../dist/index.js\').then((m) => m.printInclude())")',
		],
	}],
}
