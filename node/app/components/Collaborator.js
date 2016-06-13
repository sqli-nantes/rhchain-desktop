import React, { Component, PropTypes } from 'react';

import Modal from '../containers/Modal';

import QuestionList from '../containers/QuestionList';
import RaisedButton from 'material-ui/RaisedButton';
import SubmissionStepper from '../containers/SubmissionStepper';
import QuestionItemCollaborator from '../containers/QuestionItemCollaborator'
import QuestionItemCollaboratorResults from '../containers/QuestionItemCollaboratorResults'

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

export default class Collaborator extends Component {

	render() {
		const {home, collaborator, showResults, submit, validSubmit, voteSubmitted } = this.props;

		var step = 0;
		if( home.over ) step = 4;
		else if( collaborator.hasVoted ) step = 3;
		else if( home.loading ) step = 2;
		else if( collaborator.canSubmit ) step = 1;

		var disabled = !collaborator.canSubmit

		/* REMOVE */
		var onClickButton = step == 3 ? showResults : submit ;
		var buttonLabel = step == 3 ? "Show results" : "Soumettre";
		var color = step == 3 ? false : true;


		var button = step == 4 ? null :		
										<RaisedButton	
											primary={color} 
											style={styles.footer.button}
											labelStyle={styles.footer.button.label}
											label={buttonLabel}
											disabled={disabled} 
											onClick={onClickButton}/>
		/*--------*/



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

				<Modal onSubmit={()=>{
					validSubmit();
					setTimeout(()=>{
						voteSubmitted()
					},3000);
				}}/>
			</div>
		);
	}
}