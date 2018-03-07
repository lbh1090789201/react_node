var mysql   = require('mysql');

// MySQL数据库联接配置
var configuration = {
        host     : '127.0.0.1',
        user     : 'root',
        password : '1009',
        database : 'nodetest',
        port     : 3306,
        timezone : "local",
        multipleStatements : true
    };
// var configuration = {
//         host     : 'w.rdc.sae.sina.com.cn',
//         user     : 'o43jk5wnkn',
//         password : 'l3mhkz0jlzwi1xj03y21y2h52xiy2wzmzy0kziwh',
//         database : 'app_libhbj',
//         port     : 3306,
//         timezone : "local",
//         multipleStatements : true
//     };

module.exports = mysql.createPool(configuration);