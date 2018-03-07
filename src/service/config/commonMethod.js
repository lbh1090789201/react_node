/**
 * author_libh
 * 用于封装服务器端的公共方法
 */
var serviceConfig = {
    // "appsecret" : "931280df6b3abca80dd30ad5ce19132d"
    "appsecret" : "dee004eb7a3e10be7e9f6c42a381b5fd"
};

function commonMethod() {};

/**
 * 成功回调
 */
commonMethod.prototype.success = (callback, data, info, status) => {
    var params = {
        "data"  : data,
        "info"  : info || "操作成功！",
        "status": status || 200
    }
    callback(params);
};

/**
 * 失败回调
 */
commonMethod.prototype.fail = (callback, err, info, status) => {
    var params = {
        "errno" : err.errno,
        "code"  : err.code,
        "info"  : info || "操作失败！",
        "status": status || 403
    }
    callback(params);
};

/**
 * 计算年龄
 * str 出生年月日
 */
commonMethod.prototype.ages = (str) => {
    var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);     
    if(r==null)return   false;     
    var d= new Date(r[1], r[3]-1, r[4]);     
    if (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4])   
    {   
        var Y = new Date().getFullYear();   
        return Y-r[1]; 
    }   
    return("输入的日期格式错误！");  
};

/**
 * 计算距离当前时间值
 * str '2017-05-17T06:09:19.000Z'-时间字符串
 */
commonMethod.prototype.dateTime = (str) => {
    var time = new Date(str).getTime();
    var nowDate = new Date().getTime();
    var hour = (nowDate - time) / 1000 / 60 / 60;
    if(hour <= 1) {
        return "刚刚";
    }else if(hour > 1 && hour <= 2) {
        return "2小时之前";
    }else if(hour > 2 && hour <= 3) {
        return "3小时之前";
    }else if(hour > 3 && hour <= 4) {
        return "4小时之前";
    }else if(hour > 4 && hour <= 5) {
        return "5小时之前";
    }else if(hour > 5 && hour <= 24) {
        return "1天之前";
    }else if(hour > 24 && hour <= 48) {
        return "2天之前";
    }else if(hour > 48 && hour <= 72) {
        return "3天之前";
    }else if(hour > 72 && hour <= 96) {
        return "4天之前";
    }else if(hour > 96 && hour <= 120) {
        return "5天之前";
    }else if(hour > 120 && hour <= 168) {
        return "一周之前";
    }else if(hour > 168 && hour <= 360) {
        return "半月之前";
    }else if(hour > 360 && hour <= 720) {
        return "一个月之前";
    }else if(hour > 720 && hour <= 1440) {
        return "两个月之前";
    }else if(hour > 1440 && hour <= 2160) {
        return "三个月之前";
    }else if(hour > 2160) {
        return "很久很久以前";
    } 
};

/**
 * 获取公众号appsecret
 */
commonMethod.prototype.getAppsecret = () => {
    return serviceConfig.appsecret;
}

module.exports = new commonMethod();