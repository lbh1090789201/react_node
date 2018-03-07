var weixinSql = require('../config/weixinSql');
var userSql = require('../config/userSql');
var Promise = require("bluebird");
var pool    = Promise.promisifyAll(require('../config/db'));
var commonMethod = require("../config/commonMethod");
var fs = Promise.promisifyAll(require("fs"));
var request = require("request");
var sha1 = require("sha1");

function weixinService() {};

/**
 * 获取/缓存token的同时，判断是否有传参code，如有则同时获取用户信息
 */
weixinService.prototype.getSignature = (paramJson, callbackFun) => {
    var params = paramJson;
    params["callbackFun"] = callbackFun;
    var wxSqlToken = weixinSql.queryWeChat();
    params["appsecret"] = commonMethod.getAppsecret();
    pool.getConnectionAsync();
    pool.queryAsync(wxSqlToken)
        .then((rows) => {
            if(!rows.length) {
                request("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+params.appID+"&secret="+params.appsecret, function(err, res, body) {
                    if(err) {
                        throw {errno : "-999", errinfo : "获取全局token失败"};
                    }else {
                        params["access_token"] = JSON.parse(body).access_token;
                        request("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token="+params.access_token+"&type=jsapi", function(err, res, body) {
                            if(err) {
                                throw {errno : "-999", errinfo : "获取jsapi_ticket失败"};
                            }else{
                                params["jsapi_ticket"] = JSON.parse(body).ticket;
                                
                                // 将toke/ticket储存起来
                                createTokeAndTicket(params);
                            }
                        });
                    }
                })
            }else{
                var updateTime = new Date().getTime() - new Date(rows[0].update_time).getTime() ;
                if(updateTime > 60 * 60 * 1000) {
                    request("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+params.appID+"&secret="+params.appsecret, function(err, res, body) {
                        if(err) {
                            throw {errno : "-999", errinfo : "获取全局token失败"};
                        }else {
                            params["access_token"] = JSON.parse(body).access_token;
                            request("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token="+params.access_token+"&type=jsapi", function(err, res, body) {
                                if(err) {
                                    throw {errno : "-999", errinfo : "获取jsapi_ticket失败"};
                                }else{
                                    params["jsapi_ticket"] = JSON.parse(body).ticket;
                                    updateTokeAndTicket(params)
                                }
                            });
                        }
                    })
                }else{
                    params["access_token"] = rows[0].access_token;
                    params["jsapi_ticket"] = rows[0].jsapi_ticket;
                    getWXUserinfo(params);
                }
            }
        })
        .catch((err) => {
            pool.releaseConnectionAsync();
            commonMethod.fail(callbackFun, err, "微信授权失败");
        })
};

/**
 * 缓存token/ticket
 */
function createTokeAndTicket(params) {
    var wxSqlCreateToken = weixinSql.createToken(params);
    pool.queryAsync(wxSqlCreateToken)
        .then((rows) => {
            getWXUserinfo(params);
        })
        .catch((err) => {
            pool.releaseConnectionAsync();
            commonMethod.fail(params.callbackFun, err, "缓存token/ticket失败");
        });
}

/**
 * 更新token/ticket
 */
function updateTokeAndTicket(params) {
    var wxSqlUpdateToken = weixinSql.updateToken(params);
    pool.queryAsync(wxSqlUpdateToken)
        .then((rows) => {
            getWXUserinfo(params);
        })
        .catch((err) => {
            pool.releaseConnectionAsync();
            commonMethod.fail(params.callbackFun, err, "缓存token/ticket失败");
        });
}

/**
 * 获取用户信息
 */
function getWXUserinfo(params) {
    if(params.code) {
        // 获取用户openid
        request("https://api.weixin.qq.com/sns/oauth2/access_token?appid="+params.appID+"&secret="+params.appsecret+"&code="+params.code+"&grant_type=authorization_code", function(err, res, body) {
            if(err) {
                generateSignature(params);
            }else{
                params["openid"] = JSON.parse(body).openid;
                // 获取用户信息
                request("https://api.weixin.qq.com/cgi-bin/user/info?access_token="+params.access_token+"&openid="+params.openid+"&lang=zh_CN", function(err, res, body) {
                    if(err) {
                        generateSignature(params);
                    }else{
                        params["wxInfo"] = JSON.parse(body);
                        generateSignature(params);
                    }
                });
            }
        });
    }else{
        generateSignature(params);
    }
}

/**
 * 若存在用户，则更新用户信息
 */
// function updateUserInfo(params) {
//     // 通过openid判断用户是否已注册
//     var queryByOpenid = userSql.queryByOpenid(params.wxInfo.openid);
//     pool.queryAsync(queryByOpenid)
//         .then((rows) => {
//             if(rows.length) {
//                 generateSignature(params);
//             }else{
//                 var createUserForOpenid = userSql.createUserForOpenid(params);
//                 return pool.queryAsync(createUserForOpenid);
//             }
//         })
//         .then((rows) => {
//             if(rows) {

//             }
//         })
//         .catch((err) => {
//              generateSignature(params);
//         });
// }

/**
 * 生成签名
 */
function generateSignature(params) {
    var noncestr = "Wm"+Math.floor(Math.random() * 10)+"WZ"+Math.floor(Math.random() * 10)+"TPz"+Math.floor(Math.random() * 10)+"wzc"+Math.floor(Math.random() * 10)+"nW";
    var timestamp = new Date().getTime();
    var arr = ["jsapi_ticket", "noncestr", "timestamp", "url"];
    var str = "";
    str = 'jsapi_ticket='+params.jsapi_ticket+'&noncestr='+noncestr+'&timestamp='+timestamp+'&url='+params.url;
    var sha = sha1(str);
    pool.releaseConnectionAsync();
    var json = {
        "nonceStr" : noncestr,
        "timestamp" : timestamp,
        "signature" : sha,
        "appId" : params.appID,
        "wxInfo" : params.wxInfo
    };
    commonMethod.success(params.callbackFun, json, "获取签名成功");
}

module.exports = new weixinService();