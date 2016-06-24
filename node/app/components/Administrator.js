import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Modal from './Modal';

import QuestionList from './QuestionList';
import QuestionItemAdministrator from './QuestionItemAdministrator';
import SubmissionStepper from './SubmissionStepper';

import RaisedButton from 'material-ui/RaisedButton';

import * as AdministratorActions from '../actions/administratorActions';
import * as HomeActions from '../actions/homeActions';

const styles = {

	root: {
		height: "100vh"
	},

	button: {
		position: "absolute",
		bottom: "2vh",
		width: "50vw",
		margin: "0 25vw",
		label:{
			fontSize: "1.5em",
			fontWeight: "bold"
		}
	}
	
}

export default class Administrator extends Component {

	componentDidMount(){
		this.props.subscribeAdminEvents();
		this.props.initAdminVisibilities();
		this.props.initAdminResults();
	}

  render() {
  	const {home, administrator, submit, validSubmit, endValid} = this.props;

  	var button = home.over ? null :
							  	(<RaisedButton	secondary={true} 
												style={styles.button}
												labelStyle={styles.button.label}
												label="Valider et publier"
												onClick={()=>submit(true)} />);
    return (
    	<div style={styles.root}>
    	
    		<QuestionList>
    			<QuestionItemAdministrator />
    		</QuestionList>

    		{button}

			<Modal onSubmit={()=>{validSubmit()}}/>
		</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    administrator: state.administrator,
    home: state.home
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},AdministratorActions,HomeActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Administrator);