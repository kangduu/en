const path = require('path');
const fs = require('fs');

function getFile(folderPath) {
	var dirs = [];
	const pathName = path.join(__dirname, folderPath);
	fs.readdir(pathName, function (err, files) {
		(function iterator(i) {
			if (i == files.length) {
				return;
			}
			fs.stat(path.join(pathName, files[i]), function (err, data) {
				if (data.isFile()) {
					dirs.push(files[i]);
				}
				iterator(i + 1);
			});
		})(0);
	});
	return dirs;
}

module.exports = {
	base: '/en/',
	title: 'Learning English',
	description:
		'Learning New Concept English Volume 1 to 4. React Transition Group. TypeScript Docs.',

	head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
	dest: 'dist',

	markdown: {
		lineNumbers: true,
	},

	themeConfig: {
		logo: '/logo.png',
		nav: [
			{ text: 'React Transition Group', link: '/react-transition-group/1' },
			{
				text: 'New Concept',
				items: [
					{ text: 'First Things First', link: '/new-concept/one/1' },
					{ text: 'Practice and Progress', link: '/new-concept/two/1' },
					{ text: 'Developing Skills', link: '/new-concept/three/1' },
					{ text: 'Fluency in English', link: '/new-concept/four/1' },
				],
			},
			{
				text: 'TypeScript Docs',
				items: [
					{
						text: 'Handbook',
						link: '/ts-docs/handbook/A.the-typeScript-handbook',
					},
					{
						text: 'Reference',
						link: '/ts-docs/reference/utility-types',
					},
					{
						text: 'Declaration Files',
						link: '/ts-docs/declaration-files/introduction',
					},
					{
						text: 'Project Configuration',
						link: '/ts-docs/project-configuration/what-is-a-tsconfig.json',
					},
				],
			},
		],
		sidebar: {
			// new concept
			'/new-concept/one/': getFile('../new-concept/one'),
			'/new-concept/two/': getFile('../new-concept/two'),
			'/new-concept/three/': getFile('../new-concept/three'),
			'/new-concept/four/': getFile('../new-concept/four'),

			// typescript docs
			'/ts-docs/handbook/': getFile('../ts-docs/handbook'),
			'/ts-docs/reference/': getFile('../ts-docs/reference'),
			'/ts-docs/declaration-files/': getFile('../ts-docs/declaration-files'),
			'/ts-docs/project-configuration/': getFile(
				'../ts-docs/project-configuration'
			),

			// react transition group
			'/react-transition-group/': getFile('../react-transition-group'),
		},
	},
};
