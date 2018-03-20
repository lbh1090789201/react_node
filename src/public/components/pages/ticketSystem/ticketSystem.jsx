import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BottomNav from '../bottomNav';
import moment from 'moment';

const icon_9 = require("public/images/icon_9.png");

class TicketSystem extends React.Component{
    constructor() {
      super();
    }
    handleClickNav(index) {
      this.props.handleClickNav({type: "ticketSystem_nav_change", index: index});
    }
    handleTicketTypeClick(index) {
      this.props.handleTicketTypeClick({type: "ticket_type_change", index: index});
    }
    handleSmallType(type) {
      this.props.handleSmallType({type: "small_type_change", change_type: type})
    }
    handleCalendarClick() {
      this.props.handleCalendarClick({type: "redirect", from: "/ticketSystem/index"})
    }
    handleSubmitBtn() {
      this.props.handleCalendarClick({
        method: this.props.history,
        type: "redirect",
        from: "/ticketSystem/index",
        to: "/ticketSystem/ticketList"
      })
    }
    render() {
      const { ticketSystem } = this.props;
      let ticket_date = ticketSystem.ticket_date;
      return (
        <div id="ticketSystem_index">
          <div className="page_content">
            <div className="top_content">
              <ul>
                <li>
                  <a className={ticketSystem.nav_index == 0 ? "active" : ""} href="javascript:void(0);" onClick={this.handleClickNav.bind(this, 0)}>
                      <i></i>
                      <span>火车票</span>
                  </a>
                </li>
                <li>
                  <a className={ticketSystem.nav_index == 1 ? "active" : ""} href="javascript:void(0);" onClick={this.handleClickNav.bind(this, 1)}>
                      <i></i>
                      <span>机票</span>
                  </a>
                </li>
                <li>
                  <a className={ticketSystem.nav_index == 2 ? "active" : ""} href="javascript:void(0);" onClick={this.handleClickNav.bind(this, 2)}>
                      <i></i>
                      <span>汽车/船票</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="ticket_main_cont">
              { ticketSystem.nav_index == 2 ? <ul className="ticket_type">
                <li><span className={ticketSystem.ticket_type_index == 0 ? "active" : ""} onClick={this.handleTicketTypeClick.bind(this, 0)}>汽车票</span></li>
                <li><span className={ticketSystem.ticket_type_index == 1 ? "active" : ""} onClick={this.handleTicketTypeClick.bind(this, 1)}>船票</span></li>
              </ul> : ""}
              <div className="ticket_place">
                <Link to={{
                          pathname: "/ticketSystem/address",
                          search:'?type=begin'}}
                      className="start_palce"
                      onClick={this.handleCalendarClick.bind(this)}>
                      { ticketSystem.ticket_place_start }
                </Link>
                <span><img src={icon_9} /></span>
                <Link to={{
                          pathname: "/ticketSystem/address",
                          search:'?type=end'}}
                      className="end_palce"
                      onClick={this.handleCalendarClick.bind(this)}>
                      { ticketSystem.ticket_place_end }
                </Link>
              </div>
              <Link to="/ticketSystem/calendar" className="ticket_date" onClick={this.handleCalendarClick.bind(this)}>
                <span>{moment(ticket_date).get('month') + 1}月{moment(ticket_date).get('date')}日</span>
                <span>明天&nbsp;&nbsp;&nbsp;</span>
              </Link>
              <div className="ticket_small_type" style={{"display": "{  ticketSystem.nav_index == 0 ? 'block' : 'none'}"}}>
                <label className={ticketSystem.student_ticket ? "current" : ""} onClick={this.handleSmallType.bind(this, "student_ticket")}><span>学生票</span><i></i></label>
                <label className={ticketSystem.spead_car ? "current" : ""} onClick={this.handleSmallType.bind(this, "spead_car")}><span>高铁动车</span><i></i></label>
              </div>
              <a href="javascript:void(0);" className="query_btn" onClick={this.handleSubmitBtn.bind(this)}>查询</a>
            </div>
          </div>
          <BottomNav />
        </div>
      )
    }
}

function mapStateToProps(state) {
  const { ticketSystem } = state;
  return {
    ticketSystem: ticketSystem
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleClickNav: (action) => dispatch(action),
    handleTicketTypeClick: (action) => dispatch(action),
    handleSmallType: (action) => dispatch(action),
    handleCalendarClick: (action) => dispatch(action),
    handleChoosePlace: (action) => dispatch(action),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketSystem)
