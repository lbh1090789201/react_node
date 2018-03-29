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
    historyChooseCity: [], // 已选择过的城市
    tickets: [], // 车票信息集合
};
/**
* 采用缓存数据
*/
const historyChooseCity = $.getLStorage("historyChooseCity");
if(historyChooseCity) {
  initState["historyChooseCity"] = JSON.parse(historyChooseCity);
}
const ticket_place_start = $.getLStorage("ticket_place_start");
const ticket_place_start_flag = $.getLStorage("ticket_place_start_flag");
const ticket_place_end = $.getLStorage("ticket_place_end");
const ticket_place_end_flag = $.getLStorage("ticket_place_end_flag");
initState["ticket_place_start"] = ticket_place_start;
initState["ticket_place_start_flag"] = ticket_place_start_flag;
initState["ticket_place_end"] = ticket_place_end;
initState["ticket_place_end_flag"] = ticket_place_end_flag;

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
        case "change_tickets_data" :
          return Object.assign({}, state, {tickets: action.data});
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
      $.setLStorage("ticket_place_start", action.place);
      $.setLStorage("ticket_place_start_flag", action.flag);
    }
    if(!action.choose_place_start && action.place) {
      json["ticket_place_end"] = action.place;
      json["ticket_place_end_flag"] = action.flag;
      $.setLStorage("ticket_place_end", action.place);
      $.setLStorage("ticket_place_end_flag", action.flag);
    }
    return json;
}
