import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';

import '../public/style.css';
import '../public/bootstrap/css/bootstrap.css';
import App from './components/App';
import Signin from './components/authentication/signin';
import Signup from './components/authentication/signup';
import Signout from './components/authentication/signout';
import Home from './components/home';
import RequireAuth from './components/authentication/requireauth';

var token = localStorage.getItem('token');
var auth = token ? true : false;
var username = localStorage.getItem('username')

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App} routerProps={[auth, username]} >
      <Route path="signin" component={Signin} />
      <Route path="signup" component={Signup} />
      <Route path="home" component={RequireAuth(Home)} />
      <Route path="signout" component={Signout} />
    </Route>
  </Router>
  ,
  document.getElementById('root'),
);

