
import fetch from 'isomorphic-fetch';
import config from 'public/configuration';
import store from './reducer';

const initState = {
    isloading: false, // 是否显示加载中提示层
    // isShowPop: false, // 是否需要弹出提示窗
    // tipsWords: "", // 提示窗展示内容
    items: []
};

/**
 * 修改ajaxReducer分支的state
 * @param {*} state 
 * @param {*} action 
 */
function ajaxReducer(state = initState, action) {
    console.log(state, action, 5566)
    switch (action.type) {
        case 'AJAX_START':
            console.log(action, "ajax请求数据AJAX_START")
            return Object.assign({}, state, {
                isloading : action.isloading
            });
        case 'AJAX_SUCCESS':
            console.log(action, "ajax请求数据AJAX_SUCCESS")
            return Object.assign({}, state, {
                isloading : false,
                items: action.data
            });
        case 'AJAX_FAIL':
            console.log(action, "ajax请求数据AJAX_FAIL")
            return Object.assign({}, state, {
                isloading : false,
                items: action.data
            });
        default:
            return Object.assign({}, state);
    }
}

/**
 * ajax请求数据封装(传统方式)
 * params 请求发送的数据
 * ctrlParam 请求配置，有如下参数:
 *      isShowWait 是否展示加载层，默认 true
 *      isLastReq 是否是最后一个请求， 默认true, 每次请求结束关闭加载层
 *      isShowPop 是否需要弹出提示窗, 默认false，用于请求失败的情况
 *      isAsync 是否异步请求， 默认true
 *      dataType 请求数据类型，默认json
 *      type 请求方式， 默认POST
 *      url 请求地址，默认取配置地址
 *      errorFunc 请求失败时的回调
 *      successFunc 请求成功时的回调
 */
export function ajaxRequest(params, ctrlParam) {
    var ctrlParams = {
        isShowWait: true,
        isLastReq: true,
        isAsync: true,
        dataType: "json",
        type: "POST",
        url: ""
    };
    if(ctrlParam && $.validatorUtils.isJson(ctrlParam)) {
        for(var key in ctrlParam) {
            ctrlParams[key] = ctrlParam[key];
        }
    }
    store.dispatch((() => {
        return {
            type: "AJAX_START",
            isloading: ctrlParams.isShowWait
        }
    })());
    
    var xml = $.ajax({
        url: ctrlParams.url || config.api,
        type: ctrlParams.type,
        data: params, 
        timeout: config.ajaxTimeout || 3000, 
        success: (json) => {
            store.dispatch((() => {
                params.successFunc ? params.successFunc(json.info) : "";
                // console.log(json.data, "ajax请求数据success")
                // store.dispatch({type: "alert_show", info: "测试"})
                return {type: "AJAX_SUCCESS", data: json.data}
            })());
        },
        error: (XMLHttpRequest,status) => {
            var error_info = "";
            if(status === "timeout") {
                error_info = "网络超时";
            } else {
                // 正常报错
                error_info = json.info;
            }
            // 判断是否需要弹窗
            if(params.isShowPop) {
                store.dispatch({type: "alert_show", info: error_info});
            }
            // 判断是否有回调
            if(params.errorFunc) {
                params.errorFunc(error_info);
            }
            store.dispatch({type: "AJAX_FAIL", data: []});
        },
        complete: function(XMLHttpRequest,status) {
            if(status === "timeout") {
                xml.abort(); // 超时后中断请求
            }
        }
    });
}

/**
 * ajax请求数据封装(promise)
 * 引用：必须在组件内引入store，方法：store.dispatch(ajaxRequest({funcNo: "100000", id: 1})).then()
 * params 请求发送的数据
 * ctrlParam 请求配置，有如下参数:
 *      isShowWait 是否展示加载层，默认 true
 *      isLastReq 是否是最后一个请求， 默认true, 每次请求结束关闭加载层
 *      isShowPop 是否需要弹出提示窗, 默认false，用于请求失败的情况
 *      isAsync 是否异步请求， 默认true
 *      dataType 请求数据类型，默认json
 *      type 请求方式， 默认POST
 *      url 请求地址，默认取配置地址
 *      errorFunc 请求失败时的回调
 *      successFunc 请求成功时的回调
 */
export function ajaxPromise(params, ctrlParam) {
    var ctrlParams = {
        isShowWait: true,
        isLastReq: true,
        isAsync: true,
        dataType: "json",
        type: "POST",
        url: ""
    };
    if(ctrlParam && $.validatorUtils.isJson(ctrlParam)) {
        for(var key in ctrlParam) {
            ctrlParams[key] = ctrlParam[key];
        }
    }
    return (dispatch, getState) => {
        console.log(store.getState(), "ajax请求数据ctrlParams")
        store.dispatch((() => {
            return {
                type: "AJAX_START",
                isloading: ctrlParams.isShowWait
            }
        })());
        
        var xml = $.ajax({
            url: ctrlParams.url || config.api,
            type: ctrlParams.type,
            data: params, //{funcNo: "100000", id: 1}, // params, //
            timeout: config.ajaxTimeout || 3000, 
            success: (json) => {
                return store.dispatch({type: "AJAX_SUCCESS", data: json.data});
            },
            error: (XMLHttpRequest,status) => {
                var error_info = "";
                if(status === "timeout") {
                    error_info = "网络超时";
                } else {
                    // 正常报错
                    error_info = json.info;
                }
                // 判断是否需要弹窗
                if(params.isShowPop) {
                    store.dispatch({type: "alert_show", error_info});
                }
                return store.dispatch({type: "AJAX_FAIL", data: []});
            },
            complete: function(XMLHttpRequest,status) {
                console.log(XMLHttpRequest.readyState,status, "ajax请求数据complete")
                if(status === "timeout") {
                    xml.abort(); // 超时后中断请求
                }
            }
        });
         return xml;
    }
}

export default ajaxReducer;