const router = require('koa-router')();

router.get('/', async (ctx, next) => {
	/*
	// http status
	ctx.status =401;
	return;
	*/
	
	/*
	// ------------custom error------------
	var error = new Error("no...");
	error.name="kkkk";
	error.status = 1000;
	throw error;
	*/
	/*
	//  ----------------run error and third error-----------
	ctx.body = await ctx.redis.hgetall("device:822938295","ee");
	*/
	// -----------ok-------------
    ctx.body = {
       message:"success"
    };
   
	/*await ctx.render('index', {
		title:"API REST server"
	});*/
    // ------log------------
	console.log(`${ctx.method} ${ctx.url} ctx.response.status: ${ctx.response.status}`);
});

router.get('/string', async (ctx, next) => {
	ctx.body = 'koa2 string';
});

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  };
});

module.exports = router;
