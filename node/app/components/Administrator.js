import React, { Component } from 'react';

import QuestionList from './QuestionList';
import RaisedButton from 'material-ui/RaisedButton';
import SubmissionStepper from './SubmissionStepper';

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

	
}

export default class Administrator extends Component {
  render() {
    return (
    	<div style={styles.root}>
    	
    		<QuestionList />

    		<RaisedButton	primary={true} 
    						style={styles.footer.button}
    						labelStyle={styles.footer.button.label}
    						label="Soumettre" />
		</div>
    );
  }
}