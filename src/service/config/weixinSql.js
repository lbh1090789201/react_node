var moment = require("moment");

function weixinSql() {};

weixinSql.prototype.queryWeChat = () => {
    return 'select * from we_chat';
};

weixinSql.prototype.createToken = (params) => {
    var nowDate = new Date().toString();
    return 'insert into we_chat (access_token, jsapi_ticket, update_time) value ("'+params.access_token+'", "'+params.jsapi_ticket+'", "'+nowDate+'")';
};

weixinSql.prototype.updateToken = (params) => {
    var nowDate = new Date().toString();
    return 'update we_chat set access_token = "'+params.access_token+'", jsapi_ticket = "'+params.jsapi_ticket+'", update_time = "'+nowDate+'"';
};

module.exports = new weixinSql();