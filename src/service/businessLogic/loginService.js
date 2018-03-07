var Promise = require("bluebird");
var pool = Promise.promisifyAll(require("../config/db"));
var commonMethod = require("../config/commonMethod");
var loginSql = require("../config/loginSql");

function loginService() {};
/**
 * 用户注册
 */
loginService.prototype.registerUser = function(params, callbackFun) {
    var checkPhoneSql = loginSql.registerUser(params);
    // console.log(pool, 3333)
    pool.getConnectionAsync();
    pool.queryAsync(loginSql.checkPhone(params))
        .then((rows) => {
            if(rows.length) {
                pool.releaseConnectionAsync();
                throw {errno: "-999"};
            }else {
                return pool.queryAsync(loginSql.registerUser(params))
            }
        })
        .then((rows) => {
            pool.releaseConnectionAsync();
            commonMethod.success(callbackFun, rows, "创建用户成功！");
        })
        .catch((err) => {
            pool.releaseConnectionAsync();
            commonMethod.fail(callbackFun, err, "创建用户失败！");
        })
};

/**
 * 用户登陆
 */
loginService.prototype.userLogin = (params, callback) => {
    var checkPhone = loginSql.checkPhone(params)
    pool.getConnectionAsync();
    pool.queryAsync(checkPhone)
        .then((rows) => {
            if(rows.length) {
                if(rows[0].password === params.password) {
                    commonMethod.success(callback, rows, "登录成功");
                }else{
                    throw {errno: "-999"};
                }
            }else{
                throw {errno: "-999"};
            }
        })
        .catch((err) => {
            pool.releaseConnectionAsync();
            commonMethod.fail(callback, err, "账号或密码错误");
        });
};

module.exports = new loginService();