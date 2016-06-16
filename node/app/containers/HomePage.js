import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import Home from '../components/Home';
import * as HomeActions from '../actions/home'


const styles = {
	root: {
		height: "100%"
	}
};

export default class HomePage extends Component {
  render() {
    return (
		  <div style={styles.root}>
        <Home className="row">
      			{this.props.children}
  			</Home>
  		</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    info: state.home.info
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(HomeActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
