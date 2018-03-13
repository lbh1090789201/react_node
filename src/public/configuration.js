/**
 * 配置文件
 */
module.exports = {
    api: "http://127.0.0.1:3000/json", // 服务器接口"https://pc.essencefund.com/servlet/json",//
    ajaxTimeout: 30000, // ajax请求超时时间设置，默认为30秒之后超时，不配默认为：30秒
    itemName: "libhH5", // 项目名称，用于cookie/session/localStorage前缀
    cookieEffectTime: "30", // 设置cookie有效期/天
};
