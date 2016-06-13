import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';


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
