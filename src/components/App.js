import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';

import Header from './header/header';
import config from '../config';
import renderChildren from './render-children';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: this.props.route.routerProps[0],
      username: this.props.route.routerProps[1], 
      err: '',
      hasErr: false
    };

    this.signup = this.signup.bind(this);
    this.signin = this.signin.bind(this);
    this.signout = this.signout.bind(this);
  }

  signup(email, username, password) {
    axios.post(`${config.server}/signup`, {email, username, password}).then(res => {
      this.setState({ authenticated: true });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', username);
      browserHistory.push('/home');
    }).catch(err => {
      this.setState({ err: err.response.data.error });
    })
  }

  signin(username, password) {
    axios.post(`${config.server}/signin`, {username, password}).then(res => {
      this.setState({ authenticated: true });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', username);
      browserHistory.push('/home');
    }).catch(err => {
      this.setState({ hasErr: true });
    })
  }

  signout() {
    this.setState({ authenticated: false, username: '' });
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  render() {
    return (
      <div>
        <Header authenticated={this.state.authenticated} />
        { renderChildren(this.props, this.state, this) }
      </div>
    );
  }
}

export default App;
