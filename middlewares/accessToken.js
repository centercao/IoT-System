/**
 * Created by center ON 18-1-22
 */
let accessToken = {
	use: async function (ctx, next) {
		let uri = ctx.url;
		// let reg = new RegExp("(^/users/.*?/login|^/users/.*?/refreshAll)"); //uri = uri.replace(/([\?][^\?]+)$/, "");
		let reg = /(^\/users\/.*?\/login|^\/users\/.*?\/accessTokens|^\/users\/.*?\/allToken)/;
		let noCheck = reg.test(uri);
		if(noCheck){
			console.log("not check token...");
		}else {
			console.log("check token...");
			ctx.state.user = {
				name:"name",
				account:"15052221631",
				img:"image/15052221631.png",
				token:"token"
			};
		}
		return await next();
	}
};
module.exports = accessToken;