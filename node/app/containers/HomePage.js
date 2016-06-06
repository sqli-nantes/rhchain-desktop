import React, { Component } from 'react';
import Home from '../components/Home';
import Collaborator from '../components/Collaborator';
import Modal from '../components/Modal';


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
      			<Collaborator/>
  			</Home>
  		</div>
    );
  }
}
