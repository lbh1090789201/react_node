var userService = require("../service/businessLogic/userService");

/**
 * 设置功能号与对应的业务逻辑函数
 */
const configFuncNoToMethod = {
    "100000" : userService.selectById  // 根据用户id获取用户信息
};

module.exports = configFuncNoToMethod;
