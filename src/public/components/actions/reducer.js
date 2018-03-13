import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware  from 'redux-thunk';
//异步操作
import promiseMiddleware from 'redux-promise';
//记录日志
import { logger, createLogger } from 'redux-logger';

import websiteReducer from './websiteReducer';
import siteReducer from './siteReducer';
import ajaxReducer from './ajaxReducer';
import layerUtilsReducer from './layerUtilsReducer';
import ticketSystemReducer from './ticketSystemReducer';
import commonReducer from './commonReducer';

// RootReducer
const appReducer = combineReducers({
    websites      : websiteReducer,
    sites         : siteReducer,
    ajax   : ajaxReducer,
    layerUtils : layerUtilsReducer, // 弹出层action
    ticketSystem : ticketSystemReducer,
    common: commonReducer // 公共action
})

const loggerMiddleware = createLogger()
const store = createStore(
    appReducer,
    applyMiddleware(
      thunkMiddleware, // 允许我们 dispatch() 函数
      loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
    )
  )

export default store;
