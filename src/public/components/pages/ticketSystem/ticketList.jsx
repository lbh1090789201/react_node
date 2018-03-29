import { connect } from 'react-redux';
import addressData from '../datas/addressData';
import moment from 'moment';
import { ajaxRequest } from "../../actions/ajaxReducer";
import PageSwiper from '../../../js/swiperPage';
import ticketDatas from '../datas/trainTicket';
const icon_23 = require("src/public/images/icon_23.png");

class TicketList extends React.Component{
  constructor() {
    super();
    this.state = {
      "curPage": 1,
      "numberPage" : 10,
      "tickets" : [],
      "swiper" : "",
      time: "",
      consuming: "",
      price: ""
    }
  }
  componentWillMount() {
    const { ticketSystem } = this.props;
    // ajaxRequest({
    //   data: {
    //     funcNo: "100501",
    //     date: ticketSystem.ticket_date,
    //     from_station: ticketSystem.ticket_place_start_flag,
    //     to_station: ticketSystem.ticket_place_end_flag,
    //     purpose_codes: ticketSystem.student_ticket ? "OXOO" : "ADULT",
    //   },
    //   successFunc: function(data) {
    //     let tickets = data.data.data.result,
    //         station = data.data.data.map,
    //         ticket = [];
    //     tickets.map((item, index) => {
    //       let info = item.split("|");
    //       if(info[1] !== "列车停运") {
    //         let hasYingZuo = false; // 是否有硬座
    //         if(info[29]) {
    //           hasYingZuo = true;
    //         }
    //         let json = {
    //           "train_status" : info[1], // 火车状态
    //           "train_no" : info[2], // 火车编号
    //           "train_id" : info[3], // 火车id
    //           "start_time" : info[8], // 开始时间
    //           "end_time" : info[9], // 结束时间
    //           "total_time" : info[10], // 总时间
    //           "date" : info[13], // 日期
    //           "ruanwo" : handleTicketNumber(info[23]), // 软卧
    //           "ruanzuo" : handleTicketNumber(info[24]), // 软座
    //           "wuzuo" : handleTicketNumber(info[26]), // 无座
    //           "yingwo" : handleTicketNumber(info[28]), // 硬卧
    //           "yingzuo" : handleTicketNumber(info[29]), // 硬座
    //           "scSeat" : handleTicketNumber(info[30]), // 二等座
    //           "fcSeat" : handleTicketNumber(info[31]), // 一等座
    //           "bcSeat" : handleTicketNumber(info[32]), // 商务座 / 特等座
    //           "dongwo" : handleTicketNumber(info[33]), // 动卧
    //           "start_station_code" : info[6], // 出发站code
    //           "end_station_code" : info[7], // 终点站code
    //           "start_station" : station[info[6]], // 出发站
    //           "end_station" : station[info[7]], // 终点站
    //           "from_station_no" : info[16], // 出发地车序  查车票价格需要
    //           "to_station_no" :  info[17], // 到达地车序  查车票价格需要
    //           "seat_types" : info[35],  //     查车票价格需要
    //           "hasYingZuo" : hasYingZuo
    //         };
    //         json["hasTicket_1"] = handleCheckTicketNumber(json, 'ruanwo', 'bcSeat'); // 是否有余票
    //         json["hasTicket_2"] = handleCheckTicketNumber(json, 'yingwo', 'fcSeat');
    //         json["hasTicket_3"] = handleCheckTicketNumber(json, 'yingzuo', 'scSeat');
    //         json["hasTicket_4"] = handleCheckTicketNumber(json, 'wuzuo', 'wuzuo');
    //         ticket.push(json);
    //       }
    //     });
    //     this.props.changeTicketsData({
    //       type: "change_tickets_data",
    //       data: ticket
    //     });
    //   }.bind(this)
    // })
      let data = ticketDatas;
      let tickets = data.data.data.result,
          station = data.data.data.map,
          ticket = [];
      tickets.map((item, index) => {
        let info = item.split("|");
        if(info[1] !== "列车停运") {
          let hasYingZuo = false; // 是否有硬座
          if(info[29]) {
            hasYingZuo = true;
          }
          let json = {
            "train_status" : info[1], // 火车状态
            "train_no" : info[2], // 火车编号
            "train_id" : info[3], // 火车id
            "start_time" : info[8], // 开始时间
            "end_time" : info[9], // 结束时间
            "total_time" : info[10], // 总时间
            "date" : info[13], // 日期
            "ruanwo" : handleTicketNumber(info[23]), // 软卧
            "ruanzuo" : handleTicketNumber(info[24]), // 软座
            "wuzuo" : handleTicketNumber(info[26]), // 无座
            "yingwo" : handleTicketNumber(info[28]), // 硬卧
            "yingzuo" : handleTicketNumber(info[29]), // 硬座
            "scSeat" : handleTicketNumber(info[30]), // 二等座
            "fcSeat" : handleTicketNumber(info[31]), // 一等座
            "bcSeat" : handleTicketNumber(info[32]), // 商务座 / 特等座
            "dongwo" : handleTicketNumber(info[33]), // 动卧
            "start_station_code" : info[6], // 出发站code
            "end_station_code" : info[7], // 终点站code
            "start_station" : station[info[6]], // 出发站
            "end_station" : station[info[7]], // 终点站
            "from_station_no" : info[16], // 出发地车序  查车票价格需要
            "to_station_no" :  info[17], // 到达地车序  查车票价格需要
            "seat_types" : info[35],  //     查车票价格需要
            "hasYingZuo" : hasYingZuo
          };
          json["hasTicket_1"] = handleCheckTicketNumber(json, 'ruanwo', 'bcSeat'); // 是否有余票
          json["hasTicket_2"] = handleCheckTicketNumber(json, 'yingwo', 'fcSeat');
          json["hasTicket_3"] = handleCheckTicketNumber(json, 'yingzuo', 'scSeat');
          json["hasTicket_4"] = handleCheckTicketNumber(json, 'wuzuo', 'wuzuo');
          ticket.push(json);
        }
      });
      this.props.changeTicketsData({
        type: "change_tickets_data",
        data: ticket
      });
      this.setState({
        "tickets" : ticket
      });
  }
  componentDidMount() {
    this.createObject();
  }
  createObject() {
    this.refs.swiper.innerHTML = '<div class="main-content swiper_subject"></div>';
    this.refs.swiper.style.width = "100px";
    let wHeight = window.screen.height;
    let outHeight = this.refs.header.offsetHeight + this.refs.nav.offsetHeight + this.refs.footer.offsetHeight;
    let height = wHeight - outHeight;
    this.setState({
      swiper : null
    })
    let swiper = new PageSwiper({
      "curPage" : this.state.curPage,
      "height": height + "px",
      "el" : "#swiper_container",
      "wrapper" : ".swiper_subject",
      "getData" : function(className, page, successFun, failFun) {
          // 初始化数据
          // getDataAjax 为获取数据的方法
          this.getDataAjax(className, page, successFun, failFun)
      }.bind(this)
    });
    this.setState({
      swiper : swiper
    })
  }
  getDataAjax(className, page, successFun, failFun) {
    let totalPage = Math.ceil(this.state.tickets.length / this.state.numberPage);
    let items = this.state.tickets.slice(this.state.numberPage * (page - 1), this.state.numberPage * page);
    let html = '';
    items.map((ticket, index) => {
      html += `<div class="ticket_list">
                <ul class="ticket_info">
                  <li><span>${ticket.start_station}</span><span class="number_1">${ticket.start_time}</span></li>
                  <li><span class="small">${ticket.train_id}</span><span class="small">${ticket.total_time}</span></li>
                  <li><span>${ticket.end_station}</span><span class="number_2">${ticket.end_time}</span></li>
                  <li><p class=${ticket.train_status == "列车停运" ? "gray" : ""}>${ticket.train_status}</p></li>
                </ul>
                <ul class="ticket_seat">
                  <li>
                    <span class=${!ticket.hasTicket_1 ? "gray" : ""}>
                      ${ticket.hasYingZuo ? "软卧" + ticket.ruanwo + "张" : "特等座" + ticket.bcSeat + "张"}
                      <span class="blue" style="display:${ticket.hasTicket_1 ? 'none' : 'inline'}">(抢)</span>
                    </span>
                  </li>
                  <li>
                    <span class=${!ticket.hasTicket_2 ? "gray" : ""}>
                      ${ticket.hasYingZuo ? "硬卧" + ticket.yingwo + "张" : "一等座" + ticket.fcSeat + "张"}
                    </span>
                    <span classe="blue" style="display:${ticket.hasTicket_2 ? "none" : "inline"}">(抢)</span>
                  </li>
                  <li>
                    <span class=${!ticket.hasTicket_3 ? "gray" : ""}>
                      ${ticket.hasYingZuo ? "硬座" + ticket.yingzuo + "张" : "二等座" + ticket.scSeat + "张"}
                    </span>
                    <span class="blue" style="display:${ticket.hasTicket_3 ? "none" : "inline"}">(抢)</span></li>
                  <li>
                    <span class=${!ticket.hasTicket_4 ? "gray" : ""}>
                    无座${ticket.wuzuo}张
                    </span>
                    <span class="blue" style="display:${ticket.hasTicket_4 ? "none" : "inline"}">(抢)</span>
                  </li>
                </ul>
              </div>`
    })
    document.querySelector(className).innerHTML = html;
    successFun(className, totalPage);
  }
  handleBtnBack() {
    // 返回上一页
    this.props.handleRedirect({
      method: this.props.history,
      type: "redirect",
      to: "/ticketSystem/index"
    })
  }
  handleSelectDate() {
    // 跳转选择日期页面
    this.props.handleRedirect({
      method: this.props.history,
      type: "redirect",
      from: "/ticketSystem/ticketList",
      to: "/ticketSystem/calendar"
    })
  }
  handleBeforeDate(boolean) {
    // 选择前一天
    if(boolean) return;

  }
  handleAfterDate() {
    // 选择后一天

  }
  handleSort(type) {
    const { ticketSystem } = this.props;
    let tickets = this.state.tickets;//ticketSystem.tickets;
    let direct = this.state[type] ? this.state[type] == "up" ? "down" : "up" : "up";
    let key = "start_time";
    if(type == "price") {
      key = "price";
    } else if(type == "consuming") {
      key = "total_time";
    }
    if(tickets.length) {
      tickets.sort(sortKey(key, direct));
    }
    this.setState({
      time: "",
      consuming: "",
      price: ""
    });
    this.setState({
      "curPage" : 1,
      "tickets" : tickets,
      [type] : direct
    });
    this.createObject();
  }
  render() {
    const { ticketSystem,ajax } = this.props;
    const { time, consuming, price } = this.state;
    let nowDate = moment().format('L');
    let beforeDate = moment(ticketSystem.ticket_date).isBefore(nowDate) || moment(ticketSystem.ticket_date).isSame(nowDate);
    let tickets = ticketSystem.tickets;
    return (
      <div id="tickets_list">
        <header ref="header">
          <div className="fixed_style">
            <a href="javascript:void(0);" className="btn_back" onClick={this.handleBtnBack.bind(this)}><img src={icon_23} /></a>
            <p className="title">
              <span>上海</span>
              <i></i>
              <span>北京</span>
            </p>
          </div>
        </header>
        <section>
          <ul className="top_nav" ref="nav">
              <li><span className={beforeDate ? 'before_date gray' : 'before_date'} onClick={this.handleBeforeDate.bind(this, beforeDate)}>前一天</span></li>
            <li>
              <a href="javascript:void(0);" onClick={this.handleSelectDate.bind(this)}>
                {ticketSystem.ticket_date.substr(5,2)}月{ticketSystem.ticket_date.substr(8,2)}日 周{moment(ticketSystem.ticket_date).format("dd")}
                <i></i>
              </a>
            </li>
            <li><span className="next_date" onClick={this.handleAfterDate.bind(this)}>后一天</span></li>
          </ul>
          <div id="swiper_container" ref="swiper" style={{"height": "100%"}}>
              <div className="main-content swiper_subject">
                  {
                    // tickets.map((ticket, index) => {
                    //   return (
                    //     <div className="ticket_list">
                    //       <ul className="ticket_info">
                    //         <li><span>{ticket.start_station}</span><span className="number_1">{ticket.start_time}</span></li>
                    //         <li><span className="small">{ticket.train_id}</span><span className="small">{ticket.total_time}</span></li>
                    //         <li><span>{ticket.end_station}</span><span className="number_2">{ticket.end_time}</span></li>
                    //         <li><p className={ticket.train_status == "列车停运" ? "gray" : ""}>{ticket.train_status}</p></li>
                    //       </ul>
                    //       <ul className="ticket_seat">
                    //         <li>
                    //           <span className={!ticket.hasTicket_1 ? "gray" : ""}>
                    //             {ticket.hasYingZuo ? "软卧" + ticket.ruanwo + "张" : "特等座" + ticket.bcSeat + "张"}
                    //             <span className="blue" style={{"display" : ticket.hasTicket_1 ? "none" : "inline"}}>(抢)</span>
                    //           </span>
                    //         </li>
                    //         <li>
                    //           <span className={!ticket.hasTicket_2 ? "gray" : ""}>
                    //             {ticket.hasYingZuo ? "硬卧" + ticket.yingwo + "张" : "一等座" + ticket.fcSeat + "张"}
                    //           </span>
                    //           <span className="blue" style={{"display" : ticket.hasTicket_2 ? "none" : "inline"}}>(抢)</span>
                    //         </li>
                    //         <li>
                    //           <span className={!ticket.hasTicket_3 ? "gray" : ""}>
                    //             {ticket.hasYingZuo ? "硬座" + ticket.yingzuo + "张" : "二等座" + ticket.scSeat + "张"}
                    //           </span>
                    //           <span className="blue" style={{"display" : ticket.hasTicket_3 ? "none" : "inline"}}>(抢)</span></li>
                    //         <li>
                    //           <span className={!ticket.hasTicket_4 ? "gray" : ""}>
                    //           无座{ticket.wuzuo}张
                    //           </span>
                    //           <span className="blue" style={{"display" : ticket.hasTicket_4 ? "none" : "inline"}}>(抢)</span>
                    //         </li>
                    //       </ul>
                    //     </div>
                    //   )
                    // })
                  }
              </div>
          </div>
          <div className="footer" ref="footer">
            <ul>
              <li><p>筛选</p></li>
              <li className={time ? time == "up" ? "up" : "down" : ""} onClick={this.handleSort.bind(this, "time")}><p>出发<span className="up"> 早-晚</span><span className="down"> 晚-早</span></p></li>
              <li className={consuming ? consuming == "up" ? "up" : "down" : ""} onClick={this.handleSort.bind(this, "consuming")}><p>耗时<span className="up"> 短-长</span><span className="down"> 长-短</span></p></li>
              <li className={price ? price == "up" ? "up" : "down" : ""} onClick={this.handleSort.bind(this, "price")}><p>数量<span className="up"> 少-多</span><span className="down"> 多-少</span></p></li>
            </ul>
          </div>
        </section>
      </div>
    )
  }
}

/**
* 对票数做处理
*/
function handleTicketNumber(value) {
  if(value) {
    if(value == "无") {
      return 0;
    } else if(value == "有") {
      return 44;
    } else {
      return Number(value);
    }
  } else {
    return 0;
  }
}

/**
* 判断是否有余票
*/
function handleCheckTicketNumber(ticket, key1, key2) {
  if(ticket.hasYingZuo) {
    // 有硬座数据
    if(ticket[key1]) {
      return true;
    } else {
      return false;
    }
  } else {
    if(ticket[key2]) {
      return true;
    } else {
      return false;
    }
  }
}

/**
* 排序
*/
function sortKey(key, dec) {
  return function(a1,a2) {
      if(key == "price") {
        let number1 = a1.ruanwo + a1.ruanzuo + a1.wuzuo + a1.yingwo + a1.yingzuo + a1.scSeat + a1.fcSeat
                    +  a1.bcSeat + a1.dongwo;
        let number2 = a2.ruanwo + a2.ruanzuo + a2.wuzuo + a2.yingwo + a2.yingzuo + a2.scSeat + a2.fcSeat
                    +  a2.bcSeat + a2.dongwo;
        if(number1 > number2) {
          return dec == "up" ? 1 : -1;
        } else if(number1 < number2) {
          return dec == "up" ? -1 : 1;
        } else {
          return 0;
        }
      } else {
        if(a1[key] > a2[key]) {
          return dec == "up" ? 1 : -1;
        } else if(a1[key] < a2[key]) {
          return dec == "up" ? -1 : 1;
        } else {
          return 0;
        }
      }
  }
}

function mapStateToProps(state) {
  const { ticketSystem, ajax } = state;
  return {
    ticketSystem: ticketSystem,
    ajax: ajax
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleRedirect: (action) => dispatch(action),
    handleRedirect: (action) => dispatch(action),
    changeTicketsData: (action) => dispatch(action),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketList);
