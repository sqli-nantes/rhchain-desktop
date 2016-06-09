import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Login from '../components/Login';
import * as LoginActions from '../actions/login';

export default class LoginPage extends Component {
  render() {
    return (
      <Login />
    );
  }
}

function mapStateToProps(state) {
  return {
    error: state.login.error
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},LoginActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);