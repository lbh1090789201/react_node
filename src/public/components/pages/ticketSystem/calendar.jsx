import { connect } from 'react-redux';
import { Calendar, Badge } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const icon_23 = require("src/public/images/icon_23.png");

class CalendarSystem extends React.Component {
  constructor() {
    super();
  }
  getListData(value) {
    let listData;
    switch (value.date()) {
      case 32:
        listData = [
          { type: 'warning', content: 'warning' },
        ]; break;
      default:
    }
    return listData || [];
  }

  dateCellRender(value) {
    const listData = this.getListData(value);
    return (
      <ul className="events">
        {
          listData.map(item => (
            <li key={item.content}>
              <Badge status={item.type} text={item.content} />
            </li>
          ))
        }
      </ul>
    );
  }

  getMonthData(value) {
    if (value.month() === 8) {
      return 1394;
    }
  }
  monthCellRender(value) {
    const num = this.getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span></span>
      </div>
    ) : null;
  }
  disabledDate() {
    return false;
  }
  onSelect(value) {
    const date = moment(value).format('YYYY-MM-DD');
    this.props.changeTicketDate({type: "ticket_date_change", ticket_date: date});
    this.handleBtnBack();
  }
  onPanelChange(value) {
    const date = moment(value).format('YYYY-MM-DD');
    this.props.changeTicketDate({type: "ticket_date_change", ticket_date: date});
  }
  handleBtnBack() {
    // 返回上一页
    this.props.handleRedirect({
      method: this.props.history,
      type: "back"
    })
  }
  render() {
    const { ticketSystem } = this.props;
    return (
      <div id="system_calendar">
        <header>
          <div className="fixed_style">
            <a href="javascript:void(0);" className="btn_back" onClick={this.handleBtnBack.bind(this)}><img src={icon_23} /></a>
            <span className="title">选择出发日期</span>
          </div>
        </header>
        <section>
          <Calendar
              fullscreen={true}
              defaultValue={moment(ticketSystem.ticket_date)}
              disabledDate={this.disabledDate.bind(this)}
              dateCellRender={this.dateCellRender.bind(this)}
              monthCellRender={this.monthCellRender.bind(this)}
              onPanelChange={this.onPanelChange.bind(this)}
              onSelect={this.onSelect.bind(this)} />
        </section>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { ticketSystem } = state;
  return {
    ticketSystem: ticketSystem
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    changeTicketDate: (action) => dispatch(action),
    handleRedirect: (action) => dispatch(action)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CalendarSystem);
