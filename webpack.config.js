var path = require('path');

var build_dir = path.resolve(__dirname, 'public/build/scripts');
var app_dir = path.resolve(__dirname, 'public/src');

var config = {
	entry: app_dir+'/scripts/index.jsx',
	output: {
		path:build_dir,
		filename:'bundle.js'
	},
	module:{
		loaders:[
			{
				test:/\.jsx?/,
				include:app_dir,
				loader:'babel'
			}
		]
	}
};

module.exports = config;