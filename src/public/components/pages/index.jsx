import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ajaxRequest } from '../actions/ajaxReducer';
import * as websiteReducer from '../actions/websiteReducer';
import PopTips from "../modules/layerUtils";

const url = require("public/images/back.jpg");
const src = require("public/images/3.png");
const src_url = require("public/images/sc/wait.gif");
const icon_1 = require("public/images/icon_1.png");
const icon_2 = require("public/images/icon_2.png");
const icon_3 = require("public/images/icon_3.png");

class Index extends React.Component{
    constructor() {
        super();
    }
    componentWillMount() {
        ajaxRequest({funcNo: "100000", id: 1})
    }
    handleReduceClick() {
        let data = this.props.data;
        data.count = data.count - 1;
        // this.props.onReduceClick(data);
        this.props.actions.onReduceClick({type: "websites_reduce", data: data})
    }
    handlePopClick(msg) {
        if(msg == "取消") {
            this.props.handleDeletePopClick(msg);
        } else {
            this.props.handlePopClick(msg);
        }
    }
    render() {
        const { data, items, layerUtils, onIncreaseClick, onReduceClick } = this.props;
        console.log(this.props, this.handleReduceClick, 6666)
        let popTips = function() {
            if(layerUtils.isShow) {
                return <PopTips />
            }
        }
        return (
            <div className="productBox">
                数值：{data.count}
                <button onClick={onIncreaseClick} >加法</button>
                <button onClick={this.handleReduceClick.bind(this)} >减法</button>
                <button onClick={this.handlePopClick.bind(this, "这是第一个弹窗")} >弹窗1</button>
                <button onClick={this.handlePopClick.bind(this, "这是第二个弹窗")} >弹窗2</button>
                <button onClick={this.handlePopClick.bind(this, "取消")} >取消弹窗</button>
                用户信息: {items[0] ? items[0].show_name : ""}
                <IndexChild count={data.count} state={this.state} />
                {
                    popTips()
                }
            </div>
        );
    }
};

class IndexChild extends React.Component{
    constructor(props, contxt) {
        super();
        // this.state = {
        //     name: "李盟盟"
        // }
        console.warn(props, contxt, "子组件的constructor")
    }
    componentWillMount() {
        console.warn("调用componentWillMount")
        // this.setState({
        //     name: "你猜"
        // })
    }
    componentDidMount() {
        console.log("调用componentDidMount")
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.warn("调用shouldComponentUpdate", nextProps, nextState)
        return true
    }
    componentWillReceiveProps(nextProps) {
        console.warn("调用componentWillReceiveProps", nextProps)
    }
    componentWillUpdate(nextProps, nextState) {
        console.warn("调用componentWillUpdate", nextProps, nextState)
    }
    componentDidUpdate(nextProps, nextState) {
        console.warn("调用componentDidUpdate", nextProps, nextState)
    }
    render() {
        const { count } = this.props;
        console.warn(this.props, "子组件的props")
        return (
            <p>
                子组件: <span>{count}</span>
            </p>
        )
    }
}

Index.propTypes = {
  value: PropTypes.string.isRequired,
  onIncreaseClick: PropTypes.func.isRequired,
  onReduceClick: PropTypes.func.isRequired
}

// Map Redux state to component props
// 把相关状态绑定到组件的属性当中，这样在组件就可以使用this.props来查看相应的
function mapStateToProps(state) {
    console.log(state, 77126161)
  const { websites,ajax,layerUtils } = state;
  return {
    data: websites,
    items: ajax.items,
    layerUtils: layerUtils
  }
}

// Map Redux actions to component props
// 定义行为/事件,将行为/事件绑定到组件属性上
function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleDeletePopClick: (msg) => dispatch({type: "confirm_hide", info: "alert展示"}),
    handlePopClick: (msg) => dispatch({type: "confirm_show", info: msg}),
    onIncreaseClick: (msg) => dispatch({type: "websites_increase", data: msg}),
    // onReduceClick: (msg) => dispatch({type: "websites_reduce", data: msg}),
    actions : bindActionCreators(websiteReducer, dispatch) // 一次性绑定websiteReducer中的方法，方法必须返回object
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index);


