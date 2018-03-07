import store from "./reducer";
const initState = {
    type: "", // 弹窗类型 alert/confirm/msg
    isShow: false, // 是否展示信息
    info: "", // 展示内容
    sureBtn: "确定", // 确认按钮文本，默认确定
    cancelBtn: "取消", // 取消按钮文本，默认取消
    sureFun: "", // 确认按钮事件，默认只取消该弹出层
    cancelFun: "", // 取消按钮事件，默认只取消该弹出层
    timer: 3000 // 只用于msg，设置定时器的时效
};

/**
 * 修改layerUtilsReducer分支的state
 * 专用于弹出层
 * @param {*} state 
 * @param {*} action 
 */
export default function layerUtilsReducer(state=initState, action) {
    switch(action.type) {
        case "alert_hide" : 
           return Object.assign({}, state, handlePOP(action, "alert", false));
        case "alert_show" : 
           return Object.assign({}, state, handlePOP(action, "alert", true));
        case "confirm_hide" : 
           return Object.assign({}, state, handlePOP(action, "confirm", false));
        case "confirm_show" : 
           return Object.assign({}, state, handlePOP(action, "confirm", true));
        case "msg_hide" : 
           return Object.assign({}, state, handlePOP(action, "msg", false));
        case "msg_show" : 
           return Object.assign({}, state, handlePOP(action, "msg", true));
        default:
            return state
    }
}

/**
 * 处理弹出层的状态值
 * action  action传过来的参数
 * type 弹出层类型
 * isShow 是否展示弹出层
 */
function handlePOP(action, type, isShow) {
    var newState = {
        type: type, // 弹窗类型 alert/confirm/msg
        isShow: isShow
    };
    if(isShow) {
        // 开启则赋值
        if(action.info) {
            newState["info"] = action.info;
        }
        if(action.sureBtn) {
            newState["sureBtn"] = action.sureBtn;
        }
        if(action.cancelBtn) {
            newState["cancelBtn"] = action.cancelBtn;
        }
        if(action.sureFun) {
            newState["sureFun"] = action.sureFun;
        }
        if(action.cancelFun) {
            newState["cancelFun"] = action.cancelFun;
        }
        if(action.timer) {
            newState["timer"] = action.timer;
        }
    } else {
        // 关闭则重置状态值
        newState = initState;
    }
    
    return newState;
}

// /**
//  * 关闭弹窗
//  */
// export function sureBtnClick(type) {
//     store.dispatch({type: type})
// }
