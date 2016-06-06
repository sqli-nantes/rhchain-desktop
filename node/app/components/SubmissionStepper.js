import React, { Component } from 'react';

import { Step, Stepper, StepLabel} from 'material-ui/Stepper';

const styles = {
  root: {
  },
  step: {
    flex: 1,
    fontWeight: ""
  }
}

export default class SubmissionStepper extends Component {
  render() {
    return (
  		<Stepper style={styles.root}>
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
