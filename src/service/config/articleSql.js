function articleSql() {};

/**
 * 按类别搜索
 */
articleSql.prototype.searchByTypeSql = (params) => {
    var numberPage = params.numberPage || "10";
    var currentPage = params.currentPage || "1";
    var startIndex = (currentPage - 1) * numberPage;
    if(params.type == "title") {
        return "select count(*) from articles where title like '%" + params.title +"%'; select * from articles where title like '%" + params.title +"%' order by id DESC limit "+startIndex+","+numberPage+"";
    }else if(params.type == "author") {
        return "select count(*) from articles where author like '%" + params.author +"%'; select * from articles where author like '%" + params.author +"%' order by id DESC limit "+startIndex+","+numberPage+"";
    }else if(params.type == "author") {
        var time_to = params.time_to ? params.time_to : new Date();
        return "select count(*) from articles where create_time between" + params.time_from +"and "+time_to+"; select * from articles where create_time between" + params.time_from +"and "+time_to+" order by id DESC limit "+startIndex+","+numberPage+"";
    }else if(params.type == "new") {
        return "select count(*) from articles; select * from articles order by create_time DESC limit "+startIndex+","+numberPage+"";
    }else if(params.type == "hot") {
        return "select count(*) from articles; select * from articles order by read_amount DESC limit "+startIndex+","+numberPage+"";
    }
};

/**
 * 查询文章收藏数
 */
articleSql.prototype.collectCount = (ids) => {
    return "select count(*),article_id from favorite_articles where article_id in ("+ids+") group by article_id;";
}

/**
 * 查询文章
 */
articleSql.prototype.selectArticleById = (id) => {
    return "select * from articles where id = "+ id +";";
}

/**
 * 查询某用户前五篇优秀文章，某文章前五条评论
 */
articleSql.prototype.selectArticleInfo = (params) => {
    return "select * from articles where user_id = "+ params.user_id +" order by recom_amount limit 5; select * from comments where article_id = "
            + params.article_id +" order by id limit 10;select count(*) from comments where article_id = "+ params.article_id;
}

/**
 * 更新阅读量/评论量/推荐量/收藏
 */
articleSql.prototype.updateArticleAcount = (params) => {
    if(params.operate && params.operate == "reduce") {
        // 减少
        if(params.type == "comm_amount") {
            return "update articles set "+params.type+" = "+params.type+" - 1  where id = "+params.article_id+"; select id,show_name,avatar from users where id = " + params.user_id + ";";
        }else{
            return "update articles set "+params.type+" = "+params.type+" - 1  where id = "+params.article_id+";";
        }
    }
    if(params.type == "comm_amount") {
        return "update articles set "+params.type+" = "+params.type+" + 1  where id = "+params.article_id+"; select id,show_name,avatar from users where id = " + params.user_id + ";";
    }else{
        return "update articles set "+params.type+" = "+params.type+" + 1  where id = "+params.article_id+";";
    }
}

/**
 * 更新收藏文章数据
 */
articleSql.prototype.updateFavoriteArticle = (params) => {
    if(params.operate && params.operate == "reduce") {
        // 减少
        return "delete from favorite_articles where article_id = "+params.article_id+" and user_id = "+params.user_id+";";
    }
    return "insert into favorite_articles (user_id, article_id) values ("+params.user_id+", "+params.article_id+");";
}

/**
 * 更新推荐文章数据
 */
articleSql.prototype.updateRecommend = (params) => {
    if(params.operate && params.operate == "reduce") {
        // 减少
        return "delete from recommends where article_id = "+params.article_id+" and user_id = "+params.user_id+";";
    }
    return "insert into recommends (user_id, article_id) values ("+params.user_id+", "+params.article_id+");";
}
/**
 * 更新文章评论数据
 */
articleSql.prototype.updateComment = (params) => {
    var imageUrl = params.avatar;
    var base64Data = imageUrl.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data).toString('base64');
    return "insert into comments (user_id, show_name, article_id, content, avatar) values ("+params.user_id+", '"+params.show_name+"', "+params.article_id+", '"+params.content+"','"+dataBuffer+"');";
}

/**
 * 获取文章评论的sql
 */
articleSql.prototype.getCommentsSql = (params) => {
    var numberPage = params.numberPage || "10";
    var currentPage = params.currentPage || "1";
    var startIndex = (currentPage - 1) * numberPage;
    return "select * from comments where article_id = "+params.article_id +" order by id DESC limit "+startIndex+","+numberPage+";select count(*) from comments where article_id = "+params.article_id +";";
}

/**
 * 获取用户文章列表/收藏列表的sql
 */
articleSql.prototype.selectArticleListByUserId = (params) => {
    var numberPage = params.numberPage || 10;
        var currentPage = params.currentPage || 1;
        var startIndex = (currentPage - 1) * numberPage;
    if(params.type == 0) {
        return "select * from articles where user_id = "+params.userId +" order by create_time DESC limit "+startIndex+","+numberPage+";select count(*) from articles where user_id = "+params.userId +";";
    }else {
        return "select * from favorite_articles where user_id = "+params.userId +" order by create_time DESC limit "+startIndex+","+numberPage+";select count(*) from favorite_articles where user_id = "+params.userId +";";
    }
}

/**
 * 获取文章列表
 */
articleSql.prototype.selectForAticlesAndUsers = (articleIds, userIds) => {
    return "select * from articles where id in (" + articleIds.join(",") + ");";
}

module.exports = new articleSql();