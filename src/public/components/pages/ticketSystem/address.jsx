import { connect } from 'react-redux';
import addressData, { hotCities } from '../datas/addressData';
import PopTips from '../../modules/layerUtils';
const icon_23 = require("src/public/images/icon_23.png");

class Address extends React.Component {
  constructor() {
    super();
    this.state = {
      tags : [],
      placeJson : {},
      type: "begin"
    }
  }
  componentWillMount() {
    let station_names = addressData.station_names.split("@");
    station_names.splice(0,1);
    station_names = station_names.sort();
    let tags = [];
    let placeJson = {};
    station_names.map((station, index) => {
      let arr = station.split("|");
      let latter = arr[0].split("")[0]
      if(tags.join(",").indexOf(latter) == -1) {
        tags.push(latter);
        placeJson[latter] = [{
          "text" : arr[1],
          "flag" : arr[2]
        }];
      } else {
        placeJson[latter].push({
          "text" : arr[1],
          "flag" : arr[2]
        });
      }
    });
    // 获取是出发还是终点
    const { location } = this.props;

    let type = "begin";
    if(location.search) {
      type = $.getUrlParams("type", location.search);
    }
    this.setState({
      tags : tags,
      placeJson : placeJson,
      type: type
    })
  }
  handleBtnBack() {
    // 返回上一页
    this.props.handleRedirect({
      method: this.props.history,
      type: "redirect",
      to: "/ticketSystem/index"
    })
  }
  handleChooseCity(boolean, event) {
    const {stateHistoryChooseCity, flag, name} = handleCityData(event, this, boolean);
    const { type } = this.state;
    this.props.handleChangeCity({
      type: "ticket_place_change",
      historyChooseCity: stateHistoryChooseCity,
      flag: flag,
      place: name,
      choose_place_start: type === "begin" ? true : false
    });
    // 返回上一页
    this.props.handleRedirect({
      method: this.props.history,
      type: "redirect",
      to: "/ticketSystem/index"
    })
  }
  handleKeyUp(event) {
    // 键盘事件
    if(event.keyCode == 13) {
      const {stateHistoryChooseCity, flag, name} = handleCityData(event, this, false);
      const { type } = this.state;
      console.log(stateHistoryChooseCity, flag, name, 555555)
      if(flag) {
        this.props.handleChangeCity({
          type: "ticket_place_change",
          historyChooseCity: stateHistoryChooseCity,
          flag: flag,
          place: name,
          choose_place_start: type === "begin" ? true : false
        });
        // 返回上一页
        this.props.handleRedirect({
          method: this.props.history,
          type: "redirect",
          to: "/ticketSystem/index"
        })
      } else {
        event.target.value = "";
        this.props.handleLayerUtils({
          type: "msg_show",
          info: "不存在该站点！"
        })
      }
    }
  }
  render() {
    const { ticketSystem, layerUtils } = this.props;
    const { tags, placeJson, type} = this.state;
    let mapPlace = () => {
      let html = '';
      tags.map((tag, index) => {
        if(!html) {
          html += '<p class="item_title" name="a'+index+'" id="a'+index+'">'+tag+'</p><ul>'
        } else {
          html += '</ul><p class="item_title" name="a'+index+'" id="a'+index+'">'+tag+'</p><ul>'
        }
        placeJson[tag].map((place, key) => {
          html += '<li flag="'+place.flag+'">'+place.text+'</li>'
        })
      })
      html += '</ul>'
      return html;
    }
    return (
      <div id="system_address">
        <header>
          <div className="fixed_style">
            <a href="javascript:void(0);" className="btn_back" onClick={this.handleBtnBack.bind(this)}><img src={icon_23} /></a>
            <span className="title">{ type === "begin" ? "出发" : "到达" }</span>
          </div>
        </header>
        <section className="address_content">
          <div className="choose_input">
            {
              // <p>中文/拼音/首字母</p>
            }
            <input type="text" placeholder="中文/拼音/首字母" onKeyUp={this.handleKeyUp.bind(this)} />
          </div>
          <div className="address_left">
            <p className="item_title" name="a_1" id="a_1">当前</p>
            <div className="item_content">
              <span>定位失败</span>
            </div>
            <p className="item_title" name="a_2" id="a_2">历史选择</p>
            <div className="item_content">
              {
                ticketSystem.historyChooseCity.map((city, index) => {
                  return (<span onClick={this.handleChooseCity.bind(this, false)}>{city}</span>)
                })
              }
            </div>
            <p className="item_title" name="a_3" id="a_3">热门城市</p>
            <div className="item_content">
              {
                hotCities.map((city, index) => {
                  return (<span onClick={this.handleChooseCity.bind(this, false)}>{city}</span>)
                })
              }
            </div>
            <div className="place_list" dangerouslySetInnerHTML={{__html: mapPlace()}} onClick={this.handleChooseCity.bind(this, true)}>
            </div>
          </div>
          <div className="address_right">
            <ul>
              <li><a href="#a_1">当前</a></li>
              <li><a href="#a_2">历史</a></li>
              <li><a href="#a_3">热门</a></li>
              {
                tags.map((tag, index) => {
                  return (
                    <li key={index}><a href={"#a" + index}>{tag}</a></li>
                  )
                })
              }
            </ul>
          </div>
        </section>
        {
          layerUtils.isShow ? <PopTips /> : ""
        }
      </div>
    )
  }
}

function handleCityData(event, _this, boolean) {
  const { ticketSystem } = _this.props;
  console.log(event.target, 776666)
  let name = event.target.innerHTML || event.target.value,
      historyChooseCity = $.getLStorage("historyChooseCity"),
      stateHistoryChooseCity = ticketSystem.historyChooseCity,
      flag = '';
  if(boolean) {
    flag = event.target.getAttribute("flag");
  } else {
    for(var m = 0; m < _this.state.tags.length; m++) {
      var arr = _this.state.placeJson[_this.state.tags[m]];
      for(var n = 0; n < arr.length; n++) {
        if(arr[n].text === name) {
          flag = arr[n].flag;
          break;
        }
      }
    }
  }

  if(!flag) return {stateHistoryChooseCity,flag,name};
  // 保存在cookie中
  if(historyChooseCity) {
    historyChooseCity = JSON.parse(historyChooseCity);
    let hasCity = false; // 判断是否已选过该城市
    for(var i = 0; i < historyChooseCity.length; i++) {
      if(historyChooseCity[i] === name) {
        hasCity = true;
        break;
      }
    }
    if(!hasCity) {
      stateHistoryChooseCity.push(name);
      historyChooseCity.push(name);
      $.setLStorage("historyChooseCity", historyChooseCity);
    }
  } else {
    historyChooseCity = [name];
    stateHistoryChooseCity = [name];
    $.setLStorage("historyChooseCity", historyChooseCity);
  }
  return {stateHistoryChooseCity,flag,name};
}

function mapStateToProps(state) {
  const { ticketSystem, layerUtils } = state;
  return {
    ticketSystem: ticketSystem,
    layerUtils: layerUtils
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    changeTicketDate: (action) => dispatch(action),
    handleChangeCity: (action) => dispatch(action),
    handleRedirect: (action) => dispatch(action),
    handleLayerUtils: (action) => dispatch(action),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Address);
