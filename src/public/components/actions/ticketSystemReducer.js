import store from "./reducer";
import moment from 'moment';
import 'public/js/common';
const initState = {
    nav_index: 0, // 导航显示下标
    ticket_type_index: 0, // 飞机票类型 0-汽车票；1-船票
    student_ticket : false, // 是否选上学生票
    spead_car : false, // 是否选上高铁动车
    ticket_date: moment(new Date()).format("YYYY-MM-DD"), // 默认取今天日期
    ticket_place_start: "", // 出发点
    ticket_place_start_flag: "", // 城市标识
    ticket_place_end: "", // 结束点
    ticket_place_end_flag: "", // 城市标识
    choose_place_start: true, // 默认当前为选择出发点
    historyChooseCity: []
};
const historyChooseCity = $.getLStorage("historyChooseCity");
if(historyChooseCity) {
  console.log(historyChooseCity, 454545)
  initState["historyChooseCity"] = JSON.parse(historyChooseCity);
}

/**
 * 用于TicketSystem模块
 * @param {*} state
 * @param {*} action
 */
export default function ticketSystemReducer(state=initState, action) {
    switch(action.type) {
        case "ticketSystem_nav_change" :
            //导航栏切换
           return Object.assign({}, state, {nav_index: action.index});
        case "ticket_type_change" :
          return Object.assign({}, state, {ticket_type_index: action.index});
        case "small_type_change" :
          var json = {
            [action.change_type] : !state[action.change_type]
          }
          return Object.assign({}, state, json);
        case "ticket_date_change" :
          return Object.assign({}, state, {ticket_date: action.ticket_date});
        case "ticket_place_change" :
          return Object.assign({}, state, handleChoosePlace(action));
        default:
            return state
    }
}

/**
 * 处理选择地点事件
 */
function handleChoosePlace(action) {
    let json = {};
    json["choose_place_start"] = action.choose_place_start;
    json["historyChooseCity"] = action.historyChooseCity;
    if(action.choose_place_start && action.place) {
      json["ticket_place_start"] = action.place;
      json["ticket_place_start_flag"] = action.flag;
    }
    if(!action.choose_place_start && action.place) {
      json["ticket_place_end"] = action.place;
        json["ticket_place_end_flag"] = action.flag;
    }
    return json;
}
