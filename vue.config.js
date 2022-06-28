const path = require('path');
const rootDir = path.resolve(__dirname);
module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				//这样也只相当于指定绝对路径
				'bootstrap-css': rootDir + "\\node_modules\\bootstrap\\dist\\css\\bootstrap.min.css",
				'bootstrap-js': rootDir + "\\node_modules\\bootstrap\\dist\\js\\bootstrap.bundle.js",
				'exercise-scss': rootDir + "\\src\\common\\scss\\exercise.scss",
				'animate-css': rootDir + "\\src\\common\\css\\animate.css",
				'lodash-js': rootDir + "\\src\\common\\js\\lodash.js",
				'guoshi-js': rootDir + "\\src\\common\\js\\guoshi.js",
				'dynamics-js': rootDir + "\\src\\common\\js\\dynamics.js",
				'gsap-js': rootDir + "\\src\\common\\js\\gsap.js",
				'currency-js': rootDir + "/src/views/exercise/25-official-store-example/shopping-cart/js-version/api/currency.js",
				//	'jquery-js': rootDir + "\\scr\\common\\js\\jquery-3.6.0.js",
				tspath: rootDir + "\\src\\views\\exercise\\24-tspath",


				//or
				// 'bootstrap-css': __dirname + "\\node_modules\\bootstrap\\dist\\css\\bootstrap.min.css",
				// 'bootstrap-js': __dirname + "\\node_modules\\bootstrap\\dist\\js\\bootstrap.bundle.js",
				// 'exercise-scss': __dirname + "\\src\\common\\scss\\exercise.scss",
				// 'animate-css': __dirname + "\\src\\common\\css\\animate.css",
				// 'lodash-js': __dirname + "\\src\\common\\js\\lodash.js",
				// 'guoshi-js': __dirname + "\\src\\common\\js\\guoshi.js",
				//'tspath': __dirname + "\\src\\views\\exercise\\24-tspath",
			},
			extensions: [
				'.css',
				'.scss',
			],
		},
		devServer: {
			port: 8080,
		},
		//不能有,否则ms edge断点调试宕机
		devtool: 'source-map',

		//#region
		// dev: {
		// 	//		Paths,
		// 	assetsSubDirectory: 'static',
		// 	assetsPublicPath: '/',
		// 	proxyTable: {
		// 		'/WF': {//前端路由匹配模式
		// 			target: 'https://localhost:7018',  //后端请求服务域名和端口
		// 			changeOrigin: true,   //设置请求头
		// 			pathRewrite: {
		// 				'^/WeatherForecast': '/'   //路径重写  前端/flask-api 对应 后端/
		// 			},
		// 		},
		// 	}
		// }
		//#endregion
	}
}