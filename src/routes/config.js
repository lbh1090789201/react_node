var userService = require("../service/businessLogic/userService");
var ticketService = require("../service/thirdParty/ticketService");

/**
 * 设置功能号与对应的业务逻辑函数
 */
const configFuncNoToMethod = {
    "100000" : userService.selectById,  // 根据用户id获取用户信息
    "100501" : ticketService.getTicketList,  // 查询符合条件的车票
};

module.exports = configFuncNoToMethod;
