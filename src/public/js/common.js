import config from '../configuration';
/**
 * 客户端公共方法
 */
(function($) {
    const cookieItem = config.itemName;
    /**
     * 解析链接参数
     * @params key 取值，不传，返回全部
     * @params url 链接，不传，则取浏览器url
     */
     function getUrlParams(key, url) {
      var json = {};
      var search;
      if(url) {
        search = url.substring(url.indexOf("?") + 1);
      } else {
        search = window.location.search.substring(1);
      }
      if(search) {
        var arr = search.split("&");
        for(var i = 0; i < arr.length; i++) {
          var items = arr[i].split("=");
          json[items[0]] = items[1];
        }
      }
      if(key) {
        return json[key];
      } else {
        return json;
      }
    };

    /**
     * libh
     * 设置单个cookie
     */
     function setCookie(key, value) {
         var days = config.cookieEffectTime; // 默认有效期30天
         var date = new Date();
         date.setTime(date.getTime() + days*24*60*60*1000); // 设置有效时间
         if(typeof(value) == "object") {
             value = JSON.stringify(value);
         }
         // escape 防止值中出现";" " " "," "=" "中文"
         document.cookie = cookieItem + "|" + key + "=" + escape(value) + ";path=/;expires=" + date.toUTCString();
     };

     /**
     * libh
     * 设置多个cookie
     * options json对象
     */
     function setCookieJson(options) {
          var days = config.cookieEffectTime; // 默认有效期30天
         var date = new Date();
         date.setTime(date.getTime() + days*24*60*60*1000); // 设置有效时间
         var str = "";
         for(var key in options) {
             str = cookieItem + "|" + key + "=" + escape(options[key]);
             document.cookie = str + ";path=/;expires=" + date.toUTCString();
         };
     };

     /**
     * libh
     * 获取cookie
     * key 非必传，为空时，则获取所有的cookie值
     */
    function getCookie(key) {
        var cookies = document.cookie.split(";");
        if(key) {
            // 获取单个cookie
            for(var i = 0; i < cookies.length; i++) {
                var name = cookies[i].split("=")[0].split("|")[1];
                if(name) {
                    if(name == key) {
                        return unescape(cookies[i].split("=")[1]);
                    }
                }
            }
        } else {
            // 获取所有cookie
            var json = {};
            for(var i = 0; i < cookies.length; i++) {
                var name = cookies[i].split("=")[0].split("|")[1];
                if(name) {
                    json[name] = unescape(cookies[i].split("=")[1]);
                }
            };
            return json;
        }
    };

    /**
     * libh
     * 删除cookie
     * key 非必传，为空时，则删除所有的cookie值
     */
    function deleteCookie(key) {
        var cookies = document.cookie.split(";");
        var date = new Date();
        date.setTime(date.getTime() - 1000000000);
        if(key) {
            // 删除单个cookie
            for(var i = 0; i < cookies.length; i++) {
                var name = cookies[i].split("=")[0].split("|")[1];
                if(name) {
                    if(name == key) {
                        document.cookie = cookieItem + "|" + name + "=" + ";path=/;expires=" + date.toUTCString();
                    }
                }
            }
        } else {
            // 删除所有cookie
            for(var i = 0; i < cookies.length; i++) {
                var name = cookies[i].split("=")[0].split("|")[1];
                if(name) {
                    document.cookie = cookieItem + "|" + name + "=" + ";path=/;expires=" + date.toUTCString();
                }
            };
        }
    };

    /**
     * libh
     * 设置session
     * key 必传，为字符串时，则只设一个session，为json时，设置多个session
     */
    function setSStorage(key, value) {
        if(typeof window.sessionStorage == 'undefined'){
            console.warn("浏览暂不支持sessionStorage")
            return;
         };
        if(typeof(key) == "string") {
            if(typeof value == "object") {
              value = JSON.stringify(value);
            }
            window.sessionStorage.setItem(key, value);
        }else{
            var json = key;
            for(var index in json) {
                if(typeof json[index] == "object") {
                  window.sessionStorage.setItem(index,  JSON.stringify(json[index]));
                } else {
                  window.sessionStorage.setItem(index,  json[index]);
                }
            };
        }
    };

    /**
     * libh
     * 获取某个session
     * key 必传
     */
    function getSStorage(key) {
        if(typeof window.sessionStorage == 'undefined'){
            console.warn("浏览暂不支持sessionStorage")
            return;
         };
        return window.sessionStorage.getItem(key)
    };

    /**
     * libh
     * 删除session
     * key 非必传，为字符串时，则只删除一个session，为空时，删除所有session
     */
    function deleteSStorage(key) {
        if(typeof window.sessionStorage == 'undefined'){
            console.warn("浏览暂不支持sessionStorage")
            return;
         };
        if(key) {
            window.sessionStorage.removeItem(key);
        }else{
            window.sessionStorage.clear();
        }
    };

    /**
     * libh
     * 设置localStorage
     * key 必传，为字符串时，则只设一个localStorage，为json时，设置多个localStorage
     */
    function setLStorage(key, value) {
        if(typeof window.localStorage == 'undefined'){
            console.warn("浏览暂不支持localStorage")
            return;
         };
        if(typeof(key) == "string") {
            if(typeof value == "object") {
              value = JSON.stringify(value);
            }
            window.localStorage.setItem(key, value);
        }else{
            var json = key;
            for(var index in json) {
              if(typeof json[index] == "object") {
                window.localStorage.setItem(index,  JSON.stringify(json[index]) + 222);
              } else {
                window.localStorage.setItem(index,  json[index] + 111);
              }
            };
        }
    };

    /**
     * libh
     * 获取某个localStorage
     * key 必传
     */
    function getLStorage(key) {
        if(typeof window.localStorage == 'undefined'){
            console.warn("浏览暂不支持localStorage")
            return;
         };
        return window.localStorage.getItem(key)
    };

    /**
     * libh
     * 删除localStorage
     * key 非必传，为字符串时，则只删除一个localStorage，为空时，删除所有localStorage
     */
    function deleteLStorage(key) {
        if(typeof window.localStorage == 'undefined'){
            console.warn("浏览暂不支持localStorage")
            return;
         };
        if(key) {
            window.localStorage.removeItem(key);
        }else{
            var json = key;
            for(var index in json) {
                window.localStorage.clear();
            };
        }
    };

    $.extend({
      getUrlParams: getUrlParams,
      setCookie: setCookie,
      setCookieJson: setCookieJson,
      getCookie: getCookie,
      deleteCookie: deleteCookie,
      setSStorage: setSStorage,
      getSStorage: getSStorage,
      deleteSStorage: deleteSStorage,
      setLStorage: setLStorage,
      getLStorage: getLStorage,
      deleteLStorage: deleteLStorage
    })
})(jQuery)
