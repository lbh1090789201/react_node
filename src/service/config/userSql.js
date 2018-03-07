// module.exports = {
//     insert: 'INSERT INTO users(username, show_name, age) VALUES("new_1", "new_1", "88")',
//     update: 'update users set show_name="edit", age="18" where id = 1',
//     delete: 'delete from users where id = 4 ',
//     queryAll: 'select * from users ',
//     queryById: 'select * from users where id = 3 '
// };
var moment = require("moment");
function userSql() {};

userSql.prototype.queryById = (params) => {
    var userId = params.id;
    return 'select * from users where id =  ' + userId;
};

userSql.prototype.queryByOpenid = (openid) => {
    return 'select * from users where openid =  ' + openid;
};

userSql.prototype.updateById = (params) => {
    var age;
    var nowDay = new Date();
    var birthday = new Date(params.birthday);
    var times = nowDay.getTime() - birthday.getTime();
    var age = Math.floor(times/(365*24*60*60*1000))
    
    return "update users set show_name ='" + params.show_name + "', sex='" + params.sex + "',position='" +params.position
            + "',start_work_at='"+params.start_work_at+"',age='"+age+"',email='"+params.email+"',introduction='"
            +params.introduction+"',birthday='"+params.birthday+"',achievement='"+params.achievement+"' where id = " + params.userId;
};

userSql.prototype.updateAvatarById = (params) => {
    return "update users set avatar = '" + params.tmp_path + "' where id = " + params.userId;
};

module.exports = new userSql();