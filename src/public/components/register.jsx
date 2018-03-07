import { BrowserRouter, Switch, Route, Redirect, Match, Link, NavLink, browserHistory } from 'react-router-dom';
import { PropTypes } from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import store from './actions/reducer';
import 'public/js/common';
import 'public/js/validatorUtils';

// 引入样式
import 'public/css/style';
// 引入主组件
import Index from "./pages/index";
import UserLogin from "./pages/userLogin";

class APP extends React.Component{
    constructor() {
        super();
    }
    ComponentWillMount() {

    }
    render() {
        const pathCom = () => {
            if(window.localStorage.getItem("isLoad")) {
                return <Redirect to="/userLogin" />
            }else{
                return <Redirect to="/index" />
            }
        }
        return(
            <Provider store={ store }>
                <BrowserRouter history={browserHistory} basename="/app">
                    <div className="body-content">
                        <Switch>
                            <Route exact path="/" render={() => pathCom()} />
                            <Route exact path="/index" component={Index} />
                            <Route path="/userLogin" component={UserLogin} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Provider>
        )
    }
}

ReactDOM.render(<APP />, document.getElementById("node_app"));

if (module.hot) {
    module.hot.accept();
}


