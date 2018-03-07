import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as layerUtilsReducer from '../actions/layerUtilsReducer';

class PopTips extends React.Component{
    constructor() {
        super();
        this.handleBtnClick = this.handleBtnClick.bind(this);
    }
    handleBtnClick(type) {
        // 确定按钮点击事件
        this.props.onHandleSureClick(type);
    }
    render() {
        const { layerUtils } = this.props;
        let handleBtnClick = this.handleBtnClick;
        return (
            <div id="page_pop_tips">
                {
                    (function() {
                        if(layerUtils.type == "alert") {
                            return <Alert layerUtils={layerUtils} handleBtnClick={ handleBtnClick } />
                        } else if(layerUtils.type == "confirm") {
                            return <Confirm layerUtils={layerUtils} handleBtnClick={ handleBtnClick }  />
                        } else {
                            return <Msg layerUtils={layerUtils} handleBtnClick={ handleBtnClick } />
                        }
                    })()
                }
            </div>
        )
    }
}

class Alert extends React.Component{
    constructor() {
        super();
    }
    handleSureClick() {
        const { layerUtils,handleBtnClick } = this.props;
        if(layerUtils.sureFun) {
            layerUtils.sureFun();
        }
        handleBtnClick("alert_hide");
    }
    render() {
        const { layerUtils } = this.props;
        return (
            <div className="alert_pop_content">
                <p className="pop_info">
                    {layerUtils.info}
                </p>
                <div className="btn">
                    <a href="javascript:void(0);" className="pop_tip_alert_yes" onClick={this.handleSureClick.bind(this)} >{ layerUtils.sureBtn ? layerUtils.sureBtn : "确定" }</a>
                </div>
            </div>
        )
    }
}

class Confirm extends React.Component{
    constructor() {
        super();
    }
    handleSureClick() {
        const { layerUtils,handleBtnClick } = this.props;
        if(layerUtils.sureFun) {
            layerUtils.sureFun();
        }
        handleBtnClick("confirm_hide");
    }
    handleCancelClick() {
        const { layerUtils,handleBtnClick } = this.props;
        if(layerUtils.cancelFun) {
            layerUtils.cancelFun();
        }
        handleBtnClick("confirm_hide");
    }
    render() {
        const { layerUtils } = this.props;
        return (
            <div className="confirm_pop_content">
                <p className="pop_info">
                    {layerUtils.info}
                </p>
                <div className="btn">
                    <a href="javascript:void(0);" className="pop_tip_confirm_yes" onClick={this.handleSureClick.bind(this)} >{ layerUtils.sureBtn ? layerUtils.sureBtn : "确定" }</a>
                    <a href="javascript:void(0);" className="pop_tip_confirm_no" onClick={this.handleCancelClick.bind(this)} >{ layerUtils.cancelBtn ? layerUtils.cancelBtn : "取消" }</a>
                </div>
            </div>
        )
    }
}

class Msg extends React.Component{
    constructor() {
        super();
    }
    componentDidMount() {
        const { layerUtils,handleBtnClick } = this.props;
        var timer = setInterval(() => {
            clearInterval(timer);
            handleBtnClick("msg_hide");
        }, layerUtils.timer);
    }
    render() {
        const { layerUtils } = this.props;
        return (
            <div className="confirm_pop_content">
                <p className="pop_info">
                    {layerUtils.info}
                </p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { layerUtils } = state;
    return {
        layerUtils: layerUtils
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onHandleSureClick: (type) => dispatch({type: type})
    }
}

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(PopTips);
