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
			width: "100vw",
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
		const {app, collaborator, setAnswer, validSubmit, wait, submit, endValid, showResults} = this.props;
		var submitButton = collaborator.step < 2 ?
		(
			<RaisedButton	primary={true} 
							style={styles.footer.button}
							labelStyle={styles.footer.button.label}
							label="Soumettre"
							disabled={collaborator.step<1} 
							onClick={()=>submit(true)}/>
		) : 
		(
			<RaisedButton	primary={true} 
							style={styles.footer.button}
							labelStyle={styles.footer.button.label}
							label="Show results"
							onClick={showResults}/>
		);
		var questionItem = collaborator.step < 4 ? 
		(
			<QuestionItemCollaborator/>
		) : 
		(
			<QuestionItemCollaboratorResults />
		);
		return (
			<div style={styles.root}>
				<QuestionList >
					{questionItem}
				</QuestionList>

				<div style={styles.footer}>
		    		{submitButton}
					<SubmissionStepper style={styles.footer.stepper}/>
				</div>

				<Modal onSubmit={()=>{
					validSubmit();
					wait(true);
					setTimeout(()=>{
						wait(false);
						submit(false);
						endValid();
					},3000);
				}}/>
			</div>
		);
	}
}