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
		width: "50vw",
		margin: "0 25vw",
		label:{
			fontSize: "1.5em",
			fontWeight: "bold"
		}
	}
	
}

export class Administrator extends Component {

	componentDidMount(){
		this.props.subscribeAdminEvents();
		this.props.initAdminVisibilities();
		this.props.initAdminResults();
	}

  render() {
  	const {home, administrator, submit, validSubmit, endValid, clickCloseSurvey,clickOpenSurvey} = this.props;

		var buttonLabel;
		var buttonOnClick;
		var buttonCSS = styles.button;
		var questionList = (
    		<QuestionList>
    			<QuestionItemAdministrator />
				</QuestionList>);


		switch(home.state){
			case 0:
				buttonLabel = "Publier";
				buttonOnClick = ()=>submit(true);
				buttonCSS.bottom = "2vh";
				buttonCSS.top = undefined;
				break;
			case 1:
				buttonLabel = "Fermer";
				buttonOnClick = ()=>clickCloseSurvey();
				buttonCSS.bottom = "2vh";
				buttonCSS.top = undefined;
				break;
			case 2:
				buttonLabel = "Ouvrir";
				buttonOnClick = ()=>clickOpenSurvey();
				questionList = null;
				buttonCSS.top = "50vh";
				buttonCSS.bottom = undefined;
				break;
			default:
				console.log("DEFAULT");
				break;

		}

    return (
    	<div style={styles.root}>
    	
    		{questionList}

    		<RaisedButton	secondary={true} 
												style={buttonCSS}
												labelStyle={styles.button.label}
												label={buttonLabel}
												disabled={!home.hasMoney} 
												onClick={buttonOnClick} />

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