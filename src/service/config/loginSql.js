function loginSql() {};

/**
 * 注册用户sql语句
 */
loginSql.prototype.registerUser = (params) => {
    var sql = 'INSERT INTO users(cellphone, password) VALUES("'+params.cellphone+'", "'+params.password+'")';
    return sql;
};
/**
 * 查询手机号码sql语句
 */
loginSql.prototype.checkPhone = (params) => {
    var sql = 'select * from users where  cellphone="'+params.cellphone+'"';
    return sql;
};

module.exports = new loginSql();