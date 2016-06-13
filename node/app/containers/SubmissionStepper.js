import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Step, Stepper, StepLabel} from 'material-ui/Stepper';

const styles = {
  step: {
    flex: 1,
    fontWeight: ""
  }
}

export default class SubmissionStepper extends Component {
  render() {
    
    return (
  		<Stepper activeStep={this.props.step} style={styles.root}>
  			<Step style={styles.step}>
          <StepLabel>Attente choix</StepLabel>
        </Step>  			
  			<Step style={styles.step}>
          <StepLabel>Attente soumission</StepLabel>
        </Step>  			
  			<Step style={styles.step}>
          <StepLabel>Attente validation</StepLabel>
        </Step>
  			<Step style={styles.step}>
          <StepLabel>Attente résultats</StepLabel>
        </Step>
  		</Stepper>
    );
  }
}