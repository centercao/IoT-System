/**
 * Created by center ON 18-2-28
 */
// mocha test/ut/user_test.js // 单元测试
// istanbul cover _mocha test/ut/user_test.js  // 覆盖率测试
const app = require("./app");
var should = require('should');
var request = require('supertest');
// routes
const router = require("../../routes/users");

app.use(router.routes(), router.allowedMethods());

app.use(async (ctx, next) => {
	ctx.throw(404, ctx.message,{details:{uri:ctx.request.originalUrl}});
	// await ctx.render('common/404')
});

describe('router testing', function () {
	let server = null;
	before(function () {
		server = app.listen(); //http.createServer(app.callback());
		console.log("app listen...")
	});
	after(function () {
		server.close();
	});
	it('users', function (done) {
		console.log("request...");
		request(server)
			.get('/users')     //get方法
			.expect(200)                        //断言状态码为200
			.end((err, res) => {
				if (err) throw err;
				console.log("log:" + res.text);
				//断言data属性是一个对象
				// expect(res.body.data).to.be.an('object');
				done();
			});
	});
	it('users text', function (done) {
		request(server)
			.get('/users')
			.expect(200)
			.expect('content-type', 'text/plain; charset=utf-8')
			.end((err, res) => {
				if (err) throw err;
				console.log("log:" + res.text);
				//断言data属性是一个对象
				// expect(res.body.data).to.be.an('object');
				done();
			});
	});
});