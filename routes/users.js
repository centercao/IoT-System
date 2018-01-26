/**
 * Created by center ON 17-11-27
 */
/*********************属性**********************
 * account
 * name
 * password
 * img
 * login/logout：{token，reToken}
 **********************属性*********************/
const router = require('koa-router')();
var os =require('os');
var path = require('path');
var fs =require('fs');

router.prefix('/users');
// Patch an existing model instance or insert a new one into the data source.
router.patch('/', function (ctx, next) {
	ctx.body = 'this is a users patch response!';
});
// Find all instances of the model matched by filter from the data source.
router.get('/', function (ctx, next) {
	ctx.body = 'this is a users get response!';
});
// Replace an existing model instance or insert a new one into the data source
router.put('/', function (ctx, next) {
	// 根据必要参数决定业务
	if(ctx.request.body.user && ctx.request.body.password){ // 登录
		console.log("user login...");
	}else if(ctx.request.body.refreshToken){ //刷新 token
		console.log("refresh token ...");
	}else if(ctx.request.body.account && ctx.request.body.password && ctx.request.body.code){
		console.log("refresh all token...")
	}else{
		ctx.throw(400,"参数错误");
	}
	let user = ctx.state.user;
	ctx.body = `this is a uri:"${ctx.url}" method:${ctx.request.method} response!`;
});

// Create a new instance of the model and persist it into the data source.
router.post('/', function (ctx, next) {
	ctx.body = `this is a uri:"${ctx.url}" method:${ctx.request.method} response!`;
});
// Check whether a model instance exists in the data source.
router.head('/:id', function (ctx, next) {
	let id = ctx.params.id;
	ctx.body = `this is a uri:"${ctx.url}" method:${ctx.request.method} response!`;
});
// Find a model instance by {{id}} from the data source.
router.get('/:id', function (ctx, next) {
	let id = ctx.params.id;
	ctx.body = `this is a uri:"${ctx.url}" method:${ctx.request.method} response!`;
});
// Patch attributes for a model instance and persist it into the data source.
router.patch('/:id', function (ctx, next) {
	let id = ctx.params.id;
	ctx.body = `this is a uri:"${ctx.url}" method:${ctx.request.method} response!`;
});
// Replace attributes for a model instance and persist it into the data source
router.put('/:id', function (ctx, next) {
	let id = ctx.params.id;
	if(id && ctx.request.body.password && ctx.request.body.oldPassword){
		console.log("change password...");
	}else if(id && ctx.request.body.name){
		console.log("change user name...");
	}else {
		ctx.throw(400,"参数错误");
	}
	ctx.body = `this is a uri:"${ctx.url}" method:${ctx.request.method} response!`;
});
// Delete a model instance by {{id}} from the data source.
router.delete('/:id', function (ctx, next) {
	let id = ctx.params.id;
	if(id){
		console.log("user delete...");
	}else{
		ctx.throw(400,"参数错误");
	}
	ctx.body = `this is a uri:"${ctx.url}" method:${ctx.request.method} response!`;
});
// Queries accessTokens of User.
router.get('/:id/accessTokens', function (ctx, next) {
	let id = ctx.params.id;
	ctx.body = `this is a uri:"${ctx.url}" method:${ctx.request.method} response!`;
});
// Login a user with username/email and password.
router.put('/:id/login', function (ctx, next) {
	console.log("user login...");
	let id = ctx.params.id;
	ctx.assert(id, 400, "参数错误",{details:{id:"undefined"}});
	ctx.assert(ctx.request.body.user, 400, "参数错误",{details:{user:"undefined"}});
	ctx.assert(ctx.request.body.password, 400, "参数错误",{details:{password:"undefined"}});
	ctx.body = `this is a uri:${ctx.url}  method:${ctx.request.method} response!`;
});
// Logout a user with username/email and password.
router.put('/:id/logout', function (ctx, next) {
	let id = ctx.params.id;
	console.log("user logout...");
	ctx.body = `this is a uri:${ctx.url}  method:${ctx.request.method} response!`;
});
//  刷新 accessToken,用refreshToken
router.put('/:id/accessTokens', function (ctx, next) {
	let id = ctx.params.id;
	console.log("refresh token ...");
	ctx.assert(ctx.request.body.refreshToken, 400, "参数错误",{details:{refreshToken:"undefined"}});
	ctx.body = `this is a uri:${ctx.url}  method:${ctx.request.method} response!`;
});
// 更新所有token,供重复登录清除
router.put('/:id/allToken', function (ctx, next) {
	let id = ctx.params.id;
	console.log("user refresh allToken...");
	if(ctx.request.body.account && ctx.request.body.password && ctx.request.body.code){
		console.log("refresh all token...")
	}else{
		ctx.throw(400,"参数错误");
	}
	ctx.body = `this is a uri:${ctx.url}  method:${ctx.request.method} response!`;
});
// 上传用户头像
router.post('/:id/image', function (ctx, next) {
	let id = ctx.params.id;
	var files=ctx.request.body.files;
	for(let f in files){ // 多标签
		if(files[f].length){ // 多选
			for(let p in files[f]){
				let upFile= files[f][p].path;
				if(files[f][p].size > 0){
					let ext =files[f][p].name.replace(/.*\./,".");
					let savPath = "public/images";
					let saveFile =path.join(savPath, parseInt(Math.random()*100) + Date.parse(new Date()).toString() + ext);
					ctx.assert(fs.existsSync(savPath), 422, "保存路径错误",{details:{savPath:savPath}});
					ctx.assert(fs.existsSync(upFile), 422, "上传文件不存在",{details:{upFile:upFile}});
					let writeStream = fs.createWriteStream(saveFile);//创建一个可写流
					fs.createReadStream(upFile).pipe(writeStream).on("close",function () {
						fs.unlinkSync(upFile); // 删除
					});
				}else{
					ctx.assert(fs.existsSync(upFile), 422, "上传文件不存在",{details:{upFile:upFile}});
					fs.unlinkSync(upFile); // 删除
				}
			}
		}else {
			let upFile= files[f].path;
			if(files[f].size > 0){
				let ext =files[f].name.replace(/.*\./,".");
				let savPath = "public/images";
				let saveFile =path.join(savPath, parseInt(Math.random()*100) + Date.parse(new Date()).toString() + ext);
				ctx.assert(fs.existsSync(savPath), 422, "保存路径错误",{details:{savPath:savPath}});
				ctx.assert(fs.existsSync(upFile), 422, "上传文件不存在",{details:{upFile:upFile}});
				let writeStream = fs.createWriteStream(saveFile);//创建一个可写流
				fs.createReadStream(upFile).pipe(writeStream).on("close",function () {
					fs.unlinkSync(upFile); // 删除
				});
			}else{
				ctx.assert(fs.existsSync(upFile), 422, "上传文件不存在",{details:{upFile:upFile}});
				fs.unlinkSync(upFile); // 删除
			}
		}
		
	}
	console.log("user upload image...");
	ctx.body = `this is a uri:${ctx.url}  method:${ctx.request.method} response!`;
});
// Creates a new instance in accessTokens of this model.
router.post('/:id/accessTokens', function (ctx, next) {
	let id = ctx.params.id;
	ctx.body = `this is a uri:"${ctx.url}" method:${ctx.request.method} response!`;
});
// Deletes all accessTokens of this model.
router.delete('/:id/accessTokens', function (ctx, next) {
	let id = ctx.params.id;
	ctx.body = `this is a uri:"${ctx.url}" method:${ctx.request.method} response!`;
});
// Find a related item by id for accessTokens.
router.get('/:id/accessTokens/:fk', function (ctx, next) {
	let id = ctx.params.id;
	let fk = ctx.params.fk;
	ctx.body = `this is a uri:"${ctx.url}" method:${ctx.request.method} response!`;
});
// Update a related item by id for accessTokens.
router.put('/:id/accessTokens/:fk', function (ctx, next) {
	let id = ctx.params.id;
	let fk = ctx.params.fk;
	ctx.body = `this is a uri:"${ctx.url}" method:${ctx.request.method} response!`;
});
// Delete a related item by id for accessTokens.
router.delete('/:id/accessTokens/:fk', function (ctx, next) {
	let id = ctx.params.id;
	let fk = ctx.params.fk;
	ctx.body = `this is a uri:"${ctx.url}" method:${ctx.request.method} response!`;
});
// Counts accessTokens of User.
router.get('/:id/accessTokens/count', function (ctx, next) {
	let id = ctx.params.id;
	ctx.body = `this is a uri:"${ctx.url}" method:${ctx.request.method} response!`;
});
// Check whether a model instance exists in the data source.
router.get('/:id/exists', function (ctx, next) {
	let id = ctx.params.id;
	ctx.body = `this is a uri:"${ctx.url}" method:${ctx.request.method} response!`;
});
// Replace attributes for a model instance and persist it into the data source.
router.post('/:id/replace', function (ctx, next) {
	let id = ctx.params.id;
	ctx.body = `this is a uri:"${ctx.url}" method:${ctx.request.method} response!`;
});
// Trigger user's identity verification with configured verifyOptions
router.post('/:id/verify', function (ctx, next) {
	let id = ctx.params.id;
	ctx.body = `this is a uri:"${ctx.url}" method:${ctx.request.method} response!`;
});
// Change a user's password.
router.post('/change-password', function (ctx, next) {
	// let id = ctx.params.id;
	ctx.body = `this is a uri:"${ctx.url}" method:${ctx.request.method} response!`;
});
// Create a change stream.
router.get('/change-stream', function (ctx, next) {
	ctx.body = `this is a uri:"${ctx.url}" method:${ctx.request.method} response!`;
});
// Create a change stream.
router.post('/change-stream', function (ctx, next) {
	ctx.body = `this is a uri:"${ctx.url}" method:${ctx.request.method} response!`;
});
// Confirm a user registration with identity verification token.
router.get('/confirm', function (ctx, next) {
	ctx.body = `this is a uri:"${ctx.url}" method:${ctx.request.method} response!`;
});
// Count instances of the model matched by where from the data source.
router.get('/count', function (ctx, next) {
	ctx.body = `this is a uri:"${ctx.url}" method:${ctx.request.method} response!`;
});
// Find first instance of the model matched by filter from the data source.
router.get('/findOne', function (ctx, next) {
	ctx.body = `this is a uri:"${ctx.url}" method:${ctx.request.method} response!`;
});
// Replace an existing model instance or insert a new one into the data source.
router.post('/replaceOrCreate', function (ctx, next) {
	ctx.body = `this is a uri:"${ctx.url}" method:${ctx.request.method} response!`;
});
// Reset password for a user with email.
router.post('/reset', function (ctx, next) {
	ctx.body = `this is a uri:"${ctx.url}" method:${ctx.request.method} response!`;
});
// Reset user's password via a password-reset token.
router.post('/reset-password', function (ctx, next) {
	ctx.body = `this is a uri:"${ctx.url}" method:${ctx.request.method} response!`;
});
// Update instances of the model matched by {{where}} from the data source.
router.post('/update', function (ctx, next) {
	ctx.body = `this is a uri:"${ctx.url}" method:${ctx.request.method} response!`;
});
module.exports = router;