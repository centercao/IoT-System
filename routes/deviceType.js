/**
 * Created by center ON 17-11-28
 */
const router = require('koa-router')()

router.prefix('/deviceType');

/*******************property******************************
 * id type code
 * name
 * img support http(s) static path
 ********************property******************************/
// Patch an existing model instance or insert a new one into the data source.
router.patch('/', function (ctx, next) {
	ctx.body = 'this is a deviceType patch response!';
});
// Find all instances of the model matched by filter from the data source.
router.get('/', function (ctx, next) {
	ctx.body = 'this is a deviceType get response!';
});
// Replace an existing model instance or insert a new one into the data source
router.put('/', function (ctx, next) {
	ctx.body = 'this is a deviceType put response';
});
// Create a new instance of the model and persist it into the data source.
router.post('/', function (ctx, next) {
	ctx.body = 'this is a deviceType post response';
});
// Patch attributes for a model instance and persist it into the data source.
router.patch('/:id', function (ctx, next) {
	let id = ctx.params.id;
	ctx.body = `this is a deviceType/${id}  patch response!`;
});
// Check whether a model instance exists in the data source.
router.head('/:id', function (ctx, next) {
	let id = ctx.params.id;
	var status = ctx.response.status;
	ctx.body = {head:`this is a deviceType/${id}  head response!`};
});
// Find a model instance by {{id}} from the data source.
router.get('/:id', function (ctx, next) {
	let id = ctx.params.id;
	ctx.body = `this is a deviceType/${id} get response!`;
});
// Replace attributes for a model instance and persist it into the data source
router.put('/:id', function (ctx, next) {
	let id = ctx.params.id;
	ctx.body = `this is a deviceType/${id} put response`;
});
// Delete a model instance by {{id}} from the data source.
router.delete('/:id', function (ctx, next) {
	let id = ctx.params.id;
	ctx.body = `this is a deviceType/${id} delete response`;
});
// Check whether a model instance exists in the data source.
router.get('/:id/exists', function (ctx, next) {
	let id = ctx.params.id;
	ctx.body = `this is a deviceType/${id}/exists get response!`;
});
// Replace attributes for a model instance and persist it into the data source.
router.post('/:id/replace', function (ctx, next) {
	let id = ctx.params.id;
	ctx.body = `this is a deviceType/${id}/replace  post response!`;
});
// Create a change stream.
router.get('/change-stream', function (ctx, next) {
	ctx.body = `this is a deviceType/change-stream get response!`;
});
// Create a change stream.
router.post('/change-stream', function (ctx, next) {
	ctx.body = `this is a deviceType/change-stream post response!`;
});
// Count instances of the model matched by where from the data source.
router.get('/count', function (ctx, next) {
	ctx.body = `this is a deviceType/count get response!`;
});
// Find first instance of the model matched by filter from the data source.
router.get('/findOne', function (ctx, next) {
	ctx.body = `this is a deviceType/findOne get response!`;
});
// Replace an existing model instance or insert a new one into the data source.
router.post('/replaceOrCreate', function (ctx, next) {
	ctx.body = `this is a deviceType/replaceOrCreate post response!`;
});
// Update instances of the model matched by {{where}} from the data source.
router.post('/update', function (ctx, next) {
	ctx.body = `this is a deviceType/update post response!`;
});
// Update an existing model instance or insert a new one into the data source based on the where criteria
router.post('/upsertWithWhere', function (ctx, next) {
	ctx.body = `this is a deviceType/update post response!`;
});
module.exports = router;