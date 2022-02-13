const path = require('path');
const rootDir = path.resolve(__dirname);
module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				//这样也只是妈妈莎莎
				'bootstrap-css': rootDir + "\\node_modules\\bootstrap\\dist\\css\\bootstrap.min.css",
				'bootstrap-js': rootDir + "\\node_modules\\bootstrap\\dist\\js\\bootstrap.bundle.js",
				'exercise-scss': rootDir + "\\src\\common\\scss\\exercise.scss",
				'animate-css': rootDir + "\\src\\common\\css\\animate.css",
				'lodash-js': rootDir + "\\src\\common\\js\\lodash.js",
				'guoshi-js': rootDir + "\\src\\common\\js\\guoshi.js",
			},
			extensions: [
				'.css',
				'.scss',
			],
		},
	}
}