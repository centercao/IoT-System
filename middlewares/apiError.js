/**
 * 自定义Api异常
 * Created by center ON 17-12-11
 * const ApiError = require('../middlewares/apiError');
 * throw new ApiError(ApiError.DATA_TYPE);
 if(error instanceof ApiError){ // 自定义的错误（走异常处理）
  } else{ // System error
 
 }
 **/
const error_map = new Map();
class ApiError extends Error{
	//构造方法
	constructor(error_name){
		super();
		var error_info;
		if (error_name) {
			error_info = error_map.get(error_name);
		}
		
		//如果没有对应的错误信息，默认'未知错误'
		if (!error_info) {
			error_name = ApiError.UNKNOW_ERROR;
			error_info = error_map.get(error_name);
		}
		
		this.name = error_info.name;
		this.status = error_info.status;
		this.message = error_info.message;
	}
}
ApiError.UNKNOW_ERROR = 1000;
error_map.set(ApiError.UNKNOW_ERROR, {name:"GeneralError", status: ApiError.UNKNOW_ERROR , message: '未知错误' });

ApiError.DATA_TYPE= 1001;
error_map.set(ApiError.DATA_TYPE, {name:"ReplyError", status: ApiError.DATA_TYPE , message: '数据类型错误' });

module.exports = ApiError;