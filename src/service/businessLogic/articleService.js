var articleSql = require("../config/articleSql");
var userSql = require("../config/userSql");
var Promise = require("bluebird");
var pool = Promise.promisifyAll(require("../config/db"));
var commonMethod = require("../config/commonMethod");
var moment = require("moment");

function articleService() {};

/**
 * 搜索
 * numberPage, currentPage, type, typeValue
 */
articleService.prototype.searchByType = (params, callback) => {
    var searchByTypeSql = articleSql.searchByTypeSql(params);
    var articles = [];
    var totalPage = 0;
    var currentPage = 0;
    pool.getConnectionAsync();
    pool.queryAsync(searchByTypeSql)
        .then((rows, fields) => {
            totalPage = Math.ceil(rows[0][0]["count(*)"] / params.numberPage);
            currentPage =  params.currentPage;
            articles = rows[1];
            var ids = [];
            articles.map((article, index) => {
                article["create_time"] = commonMethod.dateTime(article.create_time);
                ids.push(article.id);
            })
            if(ids.length != 0) {
                return pool.queryAsync(articleSql.collectCount(ids.join(",")));
            }else {
                var json = {
                    "data": articles,
                    "totalPage" : totalPage,
                    "currentPage" : currentPage
                };
                commonMethod.success(callback, json, "搜索成功");
            }
            // console.log(articleSql.collectCount(ids.join(",")), 99999)
            // return pool.queryAsync(articleSql.collectCount(ids.join(",")));
        })
        .then((rows) => {
            pool.releaseConnectionAsync();
            if(rows) {
                articles.map((article, index) => {
                    article["collect_amount"] = 0;
                    rows.map((row, key) => {
                        if(article.id == row.article_id) {
                            article["collect_amount"] = rows[0]["count(*)"];
                        }
                    })
                });
                var json = {
                    "data": articles,
                    "totalPage" : totalPage,
                    "currentPage" : currentPage
                };
                commonMethod.success(callback, json, "搜索成功");
            }
        })
        .catch((err) => {
            pool.releaseConnectionAsync();
            commonMethod.fail(callback, err, "搜索失败")
        })
};

/**
 * 文章详情页--获取文章数据(包括评论/作者个人信息)
 */
articleService.prototype.getArticleInfoById = (params, callback) => {
    var selectArticleById = articleSql.selectArticleById(params.article_id);
    var json = {};
    pool.getConnectionAsync();
    pool.queryAsync(selectArticleById)
        .then((rows) => {
            json["article"] = rows[0];
            var queryById = userSql.queryById({"id" : rows[0].user_id});
            return pool.queryAsync(queryById);
        })
        .then((rows) => {
            var userInfo = rows[0];
            json["user"] = userInfo;
            var selectArticleInfo = articleSql.selectArticleInfo({"user_id" : userInfo.id, "article_id" : json["article"].id});
            return pool.queryAsync(selectArticleInfo);
        })
        .then((rows) => {
            json["authorArticles"] = rows[0];
            var commentDatas = rows[1];
            commentDatas.map((comment, index) => {
                comment["create_time"] = commonMethod.dateTime(comment.create_time);
            });
            var numberPage = params.numberPage || 10;
            json["comments"] = {
                "data" : commentDatas,
                "totalPage" : Math.ceil(rows[2][0]["count(*)"]/numberPage),
                "currentPage" : 1
            };
            pool.releaseConnectionAsync();
            commonMethod.success(callback, json, "获取数据成功");
        })
        .catch((err) => {
            pool.releaseConnectionAsync();
            commonMethod.fail(callback, err, "获取数据失败")
        })
}

/**
 * 更新阅读/评论/推荐/收藏
 */
articleService.prototype.updateArticleAcc = (params, callback) => {
    var updateArticleAcount = articleSql.updateArticleAcount(params);
    pool.getConnectionAsync();
    pool.queryAsync(updateArticleAcount)
        .then((rows) => {
            if(params.type == "read_amount") {
                // pool.releaseConnectionAsync();
                // commonMethod.success(callback, rows, "更新成功");
            }else if(params.type == "recom_amount") {
                var updateRecommend = articleSql.updateRecommend(params);
                return pool.queryAsync(updateRecommend);
            }else if(params.type == "collect_amount") {
                var updateFavoriteArticle = articleSql.updateFavoriteArticle(params);
                return pool.queryAsync(updateFavoriteArticle);
            }else if(params.type == "comm_amount") {
                params["show_name"] = rows[1][0].show_name;
                var updateComment = articleSql.updateComment(params);
                return pool.queryAsync(updateComment);
            }
        })
        .then((rows) => {
            pool.releaseConnectionAsync();
            commonMethod.success(callback, rows, "更新成功");
        })
        .catch((err) => {
            pool.releaseConnectionAsync();
            commonMethod.fail(callback, err, "更新失败")
        })
}

/**
 * 获取文章评论
 */
articleService.prototype.getCommentsByArticleId = (params, callback) => {
    var sql = articleSql.getCommentsSql(params);
    pool.getConnectionAsync();
    pool.queryAsync(sql)
        .then((rows) => {
            var json = {};
            var comments = rows[0];
            comments.map((comment, index) => {
                comment["create_time"] = commonMethod.dateTime(comment.create_time);
            });
            var numberPage = params.numberPage || 10;
            json = {
                "data" : comments,
                "totalPage" : Math.ceil(rows[1][0]["count(*)"]/numberPage),
                "currentPage" : params.currentPage
            };
            pool.releaseConnectionAsync();
            commonMethod.success(callback, json, "获取评论成功");
        })
        .catch((err) => {
            pool.releaseConnectionAsync();
            commonMethod.fail(callback, err, "获取评论失败")
        })
}

/**
 * 
 */
articleService.prototype.getArticleListById = (params, callback) => {
    params["currentPage"] = params.currentPage ? parseFloat(params.currentPage) : 1;
    var selectArticleListByUserId = articleSql.selectArticleListByUserId(params);
    var json = {};
    var timeArr = [];
    pool.getConnectionAsync();
    pool.queryAsync(selectArticleListByUserId)
        .then((rows) => {
            if(params.type == 0) {
                var articles = {};
                var nowDate = moment().format().substr(0, 10);
                articles[nowDate] = [];
                var articleList = rows[0];
                articleList.map((article, index) => {
                    var time = moment.utc(article.create_time).format().substr(0, 10);
                    if(time == nowDate) {
                        articles[nowDate].push(article);
                    }else{
                        nowDate = time;
                        articles[nowDate] = [];
                        articles[nowDate].push(article);
                    }
                });
                json["articles"] = articles;
                json["currentPage"] = params.currentPage;
                var numberPage = params.numberPage || 10;
                json["totalPage"] = Math.ceil(rows[1][0]["count(*)"] / numberPage);
                pool.releaseConnectionAsync();
                commonMethod.success(callback, json, "查询文章列表成功");
            }else{
                var articleList = rows[0];
                var articleIds = [];
                articleList.map((article, index) => {
                    articleIds.push(article.article_id);
                    timeArr.push(moment.utc(article.create_time).format().substr(0, 10));
                });
                json["currentPage"] = params.currentPage;
                var numberPage = params.numberPage || 10;
                json["totalPage"] = Math.ceil(rows[1][0]["count(*)"] / numberPage);
                var sql = articleSql.selectForAticlesAndUsers(articleIds);
                return pool.queryAsync(sql);
            }
        })
        .then((rows) => {
            if(!rows) return;
            var articles = {};
            var nowDate = moment().format().substr(0, 10);
            articles[nowDate] = [];
            var articleList = rows;
            articleList.map((article, index) => {
                var time = timeArr[index];
                if(time == nowDate) {
                    articles[nowDate].push(article);
                }else{
                    nowDate = time;
                    articles[nowDate] = [];
                    articles[nowDate].push(article);
                }
            });
            json["articles"] = articles;
            pool.releaseConnectionAsync();
            commonMethod.success(callback, json, "查询文章列表成功");
        })
        .catch((err) => {
            console.log(err, 888)
            pool.releaseConnectionAsync();
            commonMethod.fail(callback, err, "查询文章列表失败")
        })
};

module.exports = new articleService();