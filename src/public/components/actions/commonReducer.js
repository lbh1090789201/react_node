import { browserHistory } from 'react-router-dom';
const initState = {
  "prePage" : "", // 前一页
  "refresh" : false, // 页面数据都储存在state中，通过该属性来设置是否刷新上一页
}

export default function commonReducer(state=initState, action) {
  switch(action.type) {
    case "redirect" :
      return Object.assign({}, state, handleRedirect(action));
    case "back" :
      return Object.assign({}, state, handleBack(state, action));
    default :
      return state;
  }
}

/**
* 处理重定向的一些数据变化，及页面跳转
* method this.props.history
* to 要前往的页面路由
* from 当前页面的路由
* fresh 是否需要刷新页面（该参数暂无效）
*/
function handleRedirect(action) {
  if(action.to && action.method) {
    action.method.push(action.to);
  }
  return {prePage: action.from, refresh: action.refresh}
}

/**
* 处理返回的一些数据变化，及页面跳转
* method this.props.history
* to 要前往的页面路由
* fresh 是否需要刷新页面（该参数暂无效）
*/
function handleBack(state, action) {
  if(action.to && action.method) {
    action.method.push(action.to);
  }else if(action.method) {
    action.method.push(state.prePage);
  }
  return {refresh: action.refresh}
}
