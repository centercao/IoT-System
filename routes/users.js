/**
 * Created by center ON 17-11-27
 */
const router = require('koa-router')()
/*********************属性**********************
 * account
 * name
 * password
 * img
 * login/logout：{token，reToken}
 **********************属性*********************/
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
	if(ctx.state.data.user && ctx.state.data.password){ // 登录
		console.log("user login...");
	}else if(ctx.state.data.refreshToken){ //刷新 token
		console.log("refresh token ...");
	}else if(ctx.state.data.account && ctx.state.data.password && ctx.state.data.code){
		console.log("refresh all token...")
	}else{
		ctx.throw(400,"参数错误");
	}
	let user = ctx.state.user;
	ctx.body = 'this is a users put response';
});
// Login a user with username/email and password.
router.put('/login', function (ctx, next) {
    console.log("user login...");
    if(ctx.state.data.user && ctx.state.data.password){ // 登录
        console.log("user login...");
    }else{
        ctx.throw(400,"参数错误");
    }
    ctx.body = `this is a users/login post response!`;
});
// Logout a user with username/email and password.
router.put('/logout', function (ctx, next) {
    console.log("user logout...");
    ctx.body = `this is a users/logout put response!`;
});
router.put('/refreshToken', function (ctx, next) {
    console.log("refresh token ...");
    if(ctx.state.data.refreshToken){ //刷新 token
        console.log("refresh token ...");
    }else{
        ctx.throw(400,"参数错误");
    }
    ctx.body = `this is a users/refreshToken put response!`;
});
router.put('/refreshAll', function (ctx, next) {
    console.log("user refreshAll...");
    if(ctx.state.data.account && ctx.state.data.password && ctx.state.data.code){
        console.log("refresh all token...")
    }else{
        ctx.throw(400,"参数错误");
    }
    ctx.body = `this is a users/refreshAll put response!`;
});
// Create a new instance of the model and persist it into the data source.
router.post('/', function (ctx, next) {
	ctx.body = 'this is a users post response';
});
// Patch attributes for a model instance and persist it into the data source.
router.patch('/:id', function (ctx, next) {
	let id = ctx.params.id;
	ctx.body = `this is a users/${id}  patch response!`;
});
// Find a model instance by {{id}} from the data source.
router.get('/:id', function (ctx, next) {
	let id = ctx.params.id;
	ctx.body = `this is a users/${id} response!`;
});
// Check whether a model instance exists in the data source.
router.head('/:id', function (ctx, next) {
	let id = ctx.params.id;
	ctx.body = `this is a users/${id}  head response!`;
});
// Replace attributes for a model instance and persist it into the data source
router.put('/:id', function (ctx, next) {
	let id = ctx.params.id;
	if(id && ctx.state.data.password && ctx.state.data.oldPassword){
		console.log("change password...");
	}else if(id && ctx.state.data.name){
		console.log("change user name...");
	}else {
		ctx.throw(400,"参数错误");
	}
	ctx.body = `this is a users/${id} put response`;
});
// Delete a model instance by {{id}} from the data source.
router.delete('/:id', function (ctx, next) {
	let id = ctx.params.id;
	if(id){ // 登出
		console.log("user logout...");
	}else{
		ctx.throw(400,"参数错误");
	}
	ctx.body = `this is a users/${id} delete response`;
});
// Queries accessTokens of User.
router.get('/:id/accessTokens', function (ctx, next) {
	let id = ctx.params.id;
	ctx.body = `this is a users/${id}/accessTokens get response!`;
});
// Creates a new instance in accessTokens of this model.
router.post('/:id/accessTokens', function (ctx, next) {
	let id = ctx.params.id;
	ctx.body = `this is a users/${id}/accessTokens  post response!`;
});
// Deletes all accessTokens of this model.
router.delete('/:id/accessTokens', function (ctx, next) {
	let id = ctx.params.id;
	ctx.body = `this is a users/${id} delete response`;
});
// Find a related item by id for accessTokens.
router.get('/:id/accessTokens/:fk', function (ctx, next) {
	let id = ctx.params.id;
	let fk = ctx.params.fk;
	ctx.body = `this is a users/${id}/accessTokens/${fk} get response!`;
});
// Update a related item by id for accessTokens.
router.put('/:id/accessTokens/:fk', function (ctx, next) {
	let id = ctx.params.id;
	let fk = ctx.params.fk;
	ctx.body = `this is a users/${id}/accessTokens/${fk} put response`;
});
// Delete a related item by id for accessTokens.
router.delete('/:id/accessTokens/:fk', function (ctx, next) {
	let id = ctx.params.id;
	let fk = ctx.params.fk;
	ctx.body = `this is a users/${id}/accessTokens/${fk} delete response`;
});
// Counts accessTokens of User.
router.get('/:id/accessTokens/count', function (ctx, next) {
	let id = ctx.params.id;
	ctx.body = `this is a users/${id}/accessTokens/count get response!`;
});
// Check whether a model instance exists in the data source.
router.get('/:id/exists', function (ctx, next) {
	let id = ctx.params.id;
	ctx.body = `this is a users/${id}/exists get response!`;
});
// Replace attributes for a model instance and persist it into the data source.
router.post('/:id/replace', function (ctx, next) {
	let id = ctx.params.id;
	ctx.body = `this is a users/${id}/replace  post response!`;
});
// Trigger user's identity verification with configured verifyOptions
router.post('/:id/verify', function (ctx, next) {
	let id = ctx.params.id;
	ctx.body = `this is a users/${id}/verify  post response!`;
});
// Change a user's password.
router.post('/change-password', function (ctx, next) {
	// let id = ctx.params.id;
	ctx.body = `this is a users/change-password  post response!`;
});
// Create a change stream.
router.get('/change-stream', function (ctx, next) {
	ctx.body = `this is a users/change-stream get response!`;
});
// Create a change stream.
router.post('/change-stream', function (ctx, next) {
	ctx.body = `this is a users/change-stream post response!`;
});
// Confirm a user registration with identity verification token.
router.get('/confirm', function (ctx, next) {
	ctx.body = `this is a users/confirm get response!`;
});
// Count instances of the model matched by where from the data source.
router.get('/count', function (ctx, next) {
	ctx.body = `this is a users/count get response!`;
});
// Find first instance of the model matched by filter from the data source.
router.get('/findOne', function (ctx, next) {
	ctx.body = `this is a users/findOne get response!`;
});
// Replace an existing model instance or insert a new one into the data source.
router.post('/replaceOrCreate', function (ctx, next) {
	ctx.body = `this is a users/replaceOrCreate post response!`;
});
// Reset password for a user with email.
router.post('/reset', function (ctx, next) {
	ctx.body = `this is a users/reset post response!`;
});
// Reset user's password via a password-reset token.
router.post('/reset-password', function (ctx, next) {
	ctx.body = `this is a users/reset-password post response!`;
});
// Update instances of the model matched by {{where}} from the data source.
router.post('/update', function (ctx, next) {
	ctx.body = `this is a users/update post response!`;
});
module.exports = router;