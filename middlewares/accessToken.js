/**
 * Created by center ON 18-1-22
 */
let accessToken = {
	use: async function (ctx, next) {
		let uri = ctx.request.originalUrl;
		uri = uri.replace(/([\?][^\?]+)$/, "");
		let method = ctx.request.method;
		let type = ctx.request.type;
		if("GET" == method){
			ctx.state.data = ctx.request.query;
		}else{
			if("multipart/form-data" == type){
				ctx.state.data = ctx.request.body.fields;
			}else{
				ctx.state.data = ctx.request.body;
			}
		}
		switch (uri) {
			case "/users/login": {
                if((ctx.state.data.user && ctx.state.data.password) || ctx.state.data.refreshToken){
                    console.log("user login or refresh token...");
                }
                break;
			}
            case "/users/refreshAll": {
                if((ctx.state.data.user && ctx.state.data.password) || ctx.state.data.refreshToken){
                    console.log("user login or refresh token...");
                }
                break;
            }
			default: {
				ctx.state.user = {
					name:"name",
					account:"15052221631",
					img:"image/15052221631.png",
					token:"token"
				};
				console.log("check token,method:%s,uri:%s,type:%s", method, uri,type);
			}
				break;
		}
		return await next();
	}
};
module.exports = accessToken;