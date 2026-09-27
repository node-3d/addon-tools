{
	'targets': [{
		'target_name': 'consumer',
		'sources': ['consumer.cpp'],
		'include_dirs': [
			'<!@(node -e "import(\'@node-3d/addon-tools\').then((m) => m.printInclude())")',
		],
	}],
}
