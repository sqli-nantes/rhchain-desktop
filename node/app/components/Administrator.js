import React, { Component } from 'react';

import Modal from '../containers/Modal';

import QuestionList from '../containers/QuestionList';
import QuestionItemAdministrator from '../containers/QuestionItemAdministrator';
import SubmissionStepper from '../containers/SubmissionStepper';

import RaisedButton from 'material-ui/RaisedButton';

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
  render() {
  	const {home, administrator, submit, validSubmit, endValid} = this.props;

  	var button = home.over ? null :
							  	(<RaisedButton	primary={true} 
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