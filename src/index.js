//导入第三方模块
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {browserHistory, hashHistory, Router, Route, IndexRoute} from 'react-router';
//导入自定义模块
import Main from './components/Main';
import Welcome from './components/Welcome';
import Home from './containers/HomeContainer';
import Withdrawals from './containers/WithdrawalsContainer';
import Deposit from './containers/DepositContainer';
import Transfer from './containers/TransferContainer';
import Inquire from './containers/InquireContainer';
import Modify from './containers/ModifyContainer';

import store from './store/configureStore.js';
ReactDOM.render(
  <Provider store={store}>
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <Route path="welcome" component={Welcome}>
        <IndexRoute component={Home}></IndexRoute>
        <Route path="withdrawals" component={Withdrawals}></Route>
        <Route path="deposit" component={Deposit}></Route>
        <Route path="transfer" component={Transfer}></Route>//要加个ONENTER钩子函数
        <Route path="inquire" component={Inquire}></Route>
        <Route path="modify" component={Modify}></Route>
      </Route>
    </Route>
  </Router>
</Provider>, document.getElementById("app"));
