import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Modal from './Modal';

import QuestionList from './QuestionList';
import RaisedButton from 'material-ui/RaisedButton';
import SubmissionStepper from './SubmissionStepper';
import QuestionItemCollaborator from './QuestionItemCollaborator'
import QuestionItemCollaboratorResults from './QuestionItemCollaboratorResults'

import * as CollaboratorActions from '../actions/collaboratorActions';
import * as HomeActions from '../actions/homeActions';

const styles = {
	root: {
		height: "100vh"
	},

	footer: {
		button: {
			width: "50vw",
			margin: "0 25vw",
			label:{
				fontSize: "1.5em", 
				fontWeight: "bold"
			}
		},

		stepper: {
			position: "absolute",
			bottom: 0
		},

		position: "absolute",
		bottom: 0,
		width: "100vw"
	}	
};

export class Collaborator extends Component {

	componentDidMount(){
		this.props.subscribeCollabEvents();
    	this.props.initCollabState();
  	}

	render() {
		const {home, collaborator, submit, validSubmit, voteSubmitted } = this.props;

		var step = 0;
		if( home.over ) step = 4;
		else if( collaborator.hasVoted ) step = 3;
		else if( home.loading ) step = 2;
		else if( collaborator.canSubmit && home.hasMoney ) step = 1;

		var button = step > 2 ? null :	<RaisedButton	
											secondary={true} 
											style={styles.footer.button}
											labelStyle={styles.footer.button.label}
											label="Soumettre"
											disabled={step==0} 
											onClick={submit}/>

		var questionItem = home.over ? 
	      <QuestionItemCollaboratorResults/> : 
	      <QuestionItemCollaborator/> ;

		return (
			<div style={styles.root}>
				<QuestionList>
					{questionItem}
				</QuestionList>

				<div style={styles.footer}>
					<div className="row">
    					{button}
					</div>
					<SubmissionStepper step={step} style={styles.footer.stepper}/>
				</div>

				<Modal onSubmit={()=>{validSubmit()}}/>
			</div>
		);
	}
}


function mapStateToProps(state) {
  return {
    collaborator: state.collaborator,
    home: state.home
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},CollaboratorActions,HomeActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Collaborator);