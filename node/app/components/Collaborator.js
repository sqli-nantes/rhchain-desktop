import React, { Component, PropTypes } from 'react';

import QuestionList from '../containers/QuestionList';
import RaisedButton from 'material-ui/RaisedButton';
import SubmissionStepper from '../containers/SubmissionStepper';
import QuestionItemCollaborator from './QuestionItemCollaborator'

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
		const {app, collaborator, setAnswer, submitVote, validSubmit, closeValidation} = this.props;
		return (
			<div style={styles.root}>
				<QuestionList>
					<QuestionItemCollaborator answers={collaborator.answers} setAnswer={setAnswer}/>
				</QuestionList>

				<div style={styles.footer}>
		    		<RaisedButton	primary={true} 
		    						style={styles.footer.button}
		    						labelStyle={styles.footer.button.label}
		    						label="Soumettre"
		    						disabled={collaborator.step<1} />
					<SubmissionStepper  style={styles.footer.stepper}/>
				</div>
			</div>
		);
	}
}