const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors'); // 跨域
const views = require('koa-views');
const json = require('koa-json');
// const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
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
const chalk = require('chalk');
// function
Date.prototype.format = function (fmt) { //author: meizz
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};
function time(start,end) {
	const delta = end - start;
	return (delta < 10000
		? delta + 'ms'
		: Math.round(delta / 1000) + 's');
}

// error handler
// onerror(app);

// middlewares

app.use(cors()); // 跨域
app.use(bodyparser({
	enableTypes: ['json', 'form', 'text']
}));
app.use(json());

// debug log
const Logger = require('koa-logger');
app.use(Logger());
// static file dir
/*app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
	map: {html: 'ejs'}
}));*/
// log
app.use(async (ctx, next) => {
	let start = Date.now();
	try {
		console.log(chalk.green('%s') + chalk.gray(' <--')
			+ chalk.bold(' %s')
			+ chalk.gray(' %s'),
			(new Date(start)).format('yyyy-M-d h:m:s.S'),
			ctx.method,
			ctx.originalUrl);
		ctx.state.redis = redis;
		ctx.state.ApiError = apiError;
		await next();
		let end = Date.now();
		let ms =time(start,end);
		//记录响应日志
		logger.debug(formatOutput.formatRes(ctx,ms));
		console.log(chalk.green('%s') + chalk.gray(' -->')
			+ chalk.bold(' %s')
			+ chalk.gray(' %s')
			+ chalk.green(' %s')
			+ chalk.gray(' %s'),
			(new Date(end)).format('yyyy-M-d h:m:s.S'),
			ctx.method,
			ctx.originalUrl,
			ctx.response.status,
			ms);
	} catch (error) {
		let end = Date.now();
		let ms =time(start,end);
		// 错误信息开始
		// logger.error(`${ctx.method} ${ctx.url} - ${ms}ms ctx.response.status: ${ctx.response.status}`);
		logger.error(formatOutput.formatError(ctx,error,ms));
		console.log(chalk.red('%s') + chalk.gray(' -->')
			+ chalk.bold(' %s')
			+ chalk.gray(' %s')
			+ chalk.yellow(' %s')
			+ chalk.gray(' %s'),
			(new Date(end)).format('yyyy-M-d h:m:s.S'),
			ctx.method,
			ctx.originalUrl,
			ctx.response.status,
			ms);
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
app.use(async (ctx, next) => {
	ctx.throw(404, ctx.message);
	// await ctx.render('common/404')
});
// error-handling log catch error
app.on('error', (err, ctx) => {
	console.log('server error:', err, ctx);
});

module.exports = app;
