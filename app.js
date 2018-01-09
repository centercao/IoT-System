const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors'); // 跨域
const views = require('koa-views');
const json = require('koa-json');
// const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const Logger = require('koa-logger');
const LogFile = require('./middlewares/logHelper');
const Redis = require("./middlewares/redisHelper");
const redis =new Redis("127.0.0.1",6379,"root@2017@2018");
const apiError = require("./middlewares/apiError");
const FormatOutput = require("./middlewares/formatOutput");
const formatOutput = new FormatOutput();
const logger = new LogFile({
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
app.use(Logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
	map: {html: 'ejs'}
}));
// log
app.use(async (ctx, next) => {
	const start = new Date();
	try {
		ctx.state.redis = redis;
		ctx.state.ApiError = apiError;
		ctx.length =6;
		await next();
		const ms = new Date() - start;
		console.log(`${ctx.method} ${ctx.url} - ${ms}ms ctx.response.status: ${ctx.response.status}`);
		//记录响应日志
		// logger.debug(`${ctx.method} ${ctx.url} - ${ms}ms ctx.response.status: ${ctx.response.status}`);
		logger.debug(formatOutput.formatRes(ctx,ms));
	} catch (error) {
		var ms = new Date() - start;
		console.log(`${ctx.method} ${ctx.url} - ${ms}ms ctx.response.status: ${ctx.response.status}`);
		// 错误信息开始
		// logger.error(`${ctx.method} ${ctx.url} - ${ms}ms ctx.response.status: ${ctx.response.status}`);
		logger.error(formatOutput.formatError(ctx,error,ms));
	}
});
// Format output
app.use(async (ctx, next) => {
	try {
		await next();
		/*if (ctx.status != 200) {// system http code
			ctx.throw(ctx.status, ctx.message);
		}*/
	} catch (error) {
		var obj = Object.prototype.toString.call(error).match(/^\[object\s(.*)\]$/)[1];
		// format error(404: run time error,error of Third party module:422,Custom error)
		ctx.body = {
			message:error.message,
			status:error.status || 422,
		};
		ctx.status = ctx.body.status;
		throw error; // ->logs
	}
});

// routes
var route = require('./middlewares/routesHelper');
route.init(app);

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
