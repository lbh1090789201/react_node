import { BrowserRouter, Switch, Route, Redirect, Match, Link, NavLink, browserHistory } from 'react-router-dom';
import { PropTypes } from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import store from './actions/reducer';
import 'public/js/common';
import '../js/validatorUtils';

// 引入样式
import 'public/css/style';
// 引入主组件
// import UserLogin from "./pages/userLogin";
import TicketSystem from "./pages/ticketSystem/ticketSystem";
import CalendarSystem from "./pages/ticketSystem/calendar";
import Address from "./pages/ticketSystem/address";
import IconSystem from "./pages/iconSystem";
import MiscellStores from "./pages/miscellStores";
import TicketList from './pages/ticketSystem/ticketList';
// import UserLogin from './pages/login/userLogin';
import UserLogin from './pages/login/userLogin';

class APP extends React.Component{
    constructor() {
        super();
    }
    ComponentWillMount() {

    }
    render() {
      return (
        <Provider store={store} >
            <BrowserRouter history={browserHistory} basename="/mall">
                <div class="body_contents" style={{height: "100%"}}>
                  <Switch>
                      <Route exact path="/" component={TicketSystem} />
                      <Route path="/ticketSystem/index" component={TicketSystem} />
                      <Route path="/iconSystem/index" component={IconSystem} />
                      <Route path="/miscellStores/index" component={MiscellStores} />
                      <Route path="/ticketSystem/calendar" component={CalendarSystem} />
                      <Route path="/ticketSystem/address" component={Address} />
                      <Route path="/ticketSystem/ticketList" component={TicketList} />
                      <Route path="/login" component={ UserLogin } />
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
