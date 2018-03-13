import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, NavLink } from 'react-router-dom';
import { ajaxRequest } from '../actions/ajaxReducer';
import * as websiteReducer from '../actions/websiteReducer';

const url = require("public/images/back.jpg");
const src = require("public/images/3.png");
const src_url = require("public/images/sc/wait.gif");
const icon_1 = require("public/images/icon_1.png");
const icon_2 = require("public/images/icon_2.png");
const icon_3 = require("public/images/icon_3.png");

class BottomNav extends React.Component{
    constructor() {
        super();
    }
    componentWillMount() {

    }
    render() {

        return (
            <div id="bottom_nav">
                <ul>
                  <li>
                    <NavLink to="/ticketSystem/index">
                      <i></i>
                      <span>车票系统</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/iconSystem/index">
                      <i></i>
                      <span>图表系统</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/miscellStores/index">
                      <i></i>
                      <span>杂店</span>
                    </NavLink>
                  </li>
                </ul>
            </div>
        );
    }
};

// Map Redux state to component props
// 把相关状态绑定到组件的属性当中，这样在组件就可以使用this.props来查看相应的
function mapStateToProps(state) {
  return {}
}

// Map Redux actions to component props
// 定义行为/事件,将行为/事件绑定到组件属性上
function mapDispatchToProps(dispatch, ownProps) {
  return {

  }
}

export default BottomNav;
