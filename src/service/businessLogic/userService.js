var userSql = require('../config/userSql');
var Promise = require("bluebird");
var pool    = Promise.promisifyAll(require('../config/db'));
var commonMethod = require("../config/commonMethod");
var fs = Promise.promisifyAll(require("fs"));

function userService() {};

/**
 * 获取所有的用户信息
 */
// userService.prototype.selectUserAll = function(params, callback) {
//     pool.getConnection(function(err, connection) {
//         if(err) throw err;
//         connection.query(userSql.queryAll, function(err, rows) {
//             if(err) throw err;
//             callback ? callback(rows) : "";
//             connection.release();
//         });
//     });
// };

/**
 * 获取单个用户信息
 */
userService.prototype.selectById = function(params, callback) {
    var queryById = userSql.queryById(params);
    console.log(queryById, 5555)
    pool.getConnectionAsync();
    pool.queryAsync(queryById)
        .then((rows) => {
            pool.releaseConnectionAsync();
            commonMethod.success(callback, rows, "获取用户信息成功！");
        })
        .catch((err) => {
            pool.releaseConnectionAsync();
            commonMethod.fail(callback, err, "获取用户信息失败！");
        });
};

/**
 * 更新用户信息
 */
userService.prototype.updateUserInfo = (params, callback) => {
    var updateById = userSql.updateById(params);
    pool.getConnectionAsync();
    pool.queryAsync(updateById)
        .then((rows) => {
            pool.releaseConnectionAsync();
            commonMethod.success(callback, rows, "保存成功！");
        })
        .catch((err) => {
            pool.releaseConnectionAsync();
            commonMethod.fail(callback, err, "保存失败！");
        });
};

/**
 * 更新头像
 */
userService.prototype.updateUserAvatar = function(params, callback) {
    var tmp_path ='/avatars/'+params.userId+'.png';
    var base64Data=params.imageUrl.replace(/^data:image\/png;base64,/,"");
    var binaryData=new Buffer(base64Data, 'base64').toString('binary');
    fs.writeFileAsync("./tmp" + tmp_path, binaryData, 'binary')
      .then(() => {
            params["tmp_path"] = tmp_path;
            var updateAvatarById = userSql.updateAvatarById(params);
            pool.getConnectionAsync();
            return pool.queryAsync(updateAvatarById);
       })
       .then((rows) => {
            pool.releaseConnectionAsync();
            commonMethod.success(callback, rows, "保存头像成功！");
       })
       .catch((err) => {
           pool.releaseConnectionAsync();
          commonMethod.fail(callback, err, "保存头像失败！");
       })
};

/**
 * 上传文件
 */
userService.prototype.uploadFile = function(params, callback) {
    // 将上传的文件转移到指定目录
    var tmp_path = params.file.path;
    var target_path = "./tmp/files/" + params.file.name;

    var readStream = fs.createReadStream(tmp_path, {flags:"r",encoding:null, mode:0666})
    var writeStream = fs.createWriteStream(target_path,{flags:"a",encoding:null, mode:0666})
    readStream.pipe(writeStream);
    readStream.on('end',function(){
        fs.unlinkAsync(tmp_path)
          .then(() => {
              commonMethod.success(callback, [], "上传成功！");
          })
          .catch((err) => {
              commonMethod.fail(callback, err, "上传失败！");
          })
    });
};

module.exports = new userService();
