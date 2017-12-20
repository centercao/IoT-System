const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors'); // 跨域
const views = require('koa-views');
const json = require('koa-json');
// const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const ApiError = require('./middlewares/apiError');
const LogFile = require('./middlewares/logHelper');
const Redis = require("./middlewares/redisHelper");
const redis =new Redis("127.0.0.1",6379,"root@2017@2018");
const apiError = require("./middlewares/apiError");
const FormatOutput = require("./middlewares/formatOutput");
const formatOutput = new FormatOutput();
const logFile = new LogFile({
	appenders: {file: {filename: "./logs/api.log", maxLogSize: 2048000}},
	categories: {
		file:{appenders: ['file'], level: 'debug'}
	},
	pm2InstanceVar: 'INSTANCE_ID_API'
});

// error handler
// onerror(app);

// middlewares
app.use(cors()); // 跨域
app.use(bodyparser({
	enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
	map: {html: 'ejs'}
}));
// log
app.use(async (ctx, next) => {
	const start = new Date();
	try {
		ctx.logger = logFile;
		ctx.redis = redis;
		ctx.apiError = apiError;
		await next();
		const ms = new Date() - start;
		console.log(`${ctx.method} ${ctx.url} - ${ms}ms ctx.response.status: ${ctx.response.status}`);
		//记录响应日志
		// logFile.debug(`${ctx.method} ${ctx.url} - ${ms}ms ctx.response.status: ${ctx.response.status}`);
		logFile.debug(formatOutput.formatRes(ctx,ms));
	} catch (error) {
		var ms = new Date() - start;
		console.log(`${ctx.method} ${ctx.url} - ${ms}ms ctx.response.status: ${ctx.response.status}`);
		// 错误信息开始
		// logFile.error(`${ctx.method} ${ctx.url} - ${ms}ms ctx.response.status: ${ctx.response.status}`);
		logFile.error(formatOutput.formatError(ctx,error,ms));
	}
});
// 格式化输出 (正常/异常数据）
app.use(async (ctx, next) => {
	try {
		await next();
		if (ctx.status != 200) {// system http code
			let error = new Error(ctx.message);
			error.status = ctx.status;
			throw error;
		}
	} catch (error) {
		// 格式化错误(404: run time error,error of Third party module;Custom error)
		ctx.body = {
			status: error.status || 500,
			name:error.name || "SystemError",
			message: error.message,
			debug: error.stack.replace(/Error\n/).split(/\n/)[1].replace(/^\s+|\s+$/, "")
		};
		ctx.status = ctx.body.status >= 1000?500:ctx.body.status;
		// 继续抛，让外层中间件处理日志,包括系统异常
		throw error;
	}
});

// routes
const index = require('./routes/index');
app.use(index.routes(), index.allowedMethods());
const users = require('./routes/users');
app.use(users.routes(), users.allowedMethods());
const devices = require('./routes/devices');
app.use(devices.routes(), devices.allowedMethods());
const deviceType = require('./routes/deviceType');
app.use(deviceType.routes(), deviceType.allowedMethods());
const gateway = require('./routes/gateway');
app.use(gateway.routes(), gateway.allowedMethods());
const sensor = require('./routes/sensor');
app.use(sensor.routes(), sensor.allowedMethods());

// 404 url error
/*app.use(async (ctx, next) => {
	// ctx.status = 404;
	// throw new Error(ctx.message);
	// await ctx.render('common/404')
});*/
// error-handling log catch error
app.on('error', (err, ctx) => {
	console.error('server error', err, ctx);
});

module.exports = app;
