import React, { Component } from 'react';
import { connect } from 'react-redux';

import ResultPie from '../components/ResultPie';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import SocialSentimentSatisfied from 'material-ui/svg-icons/social/sentiment-satisfied';
import SocialSentimentNeutral from 'material-ui/svg-icons/social/sentiment-neutral';
import SocialSentimentDissatisfied from 'material-ui/svg-icons/social/sentiment-dissatisfied';

const styles = {
	root:{
    height: "100%",
    textAlign: "center",
    marginTop: "2vh"
	},
  icon: {
    height: "64px",
    width: "64px",
    margin: "0 5vw"
  },
  iconColor: "black",
  results: {
    height: "10vh"
  }
}

export default class QuestionItemCollaboratorResults extends Component {

  render() {
    const { idxQuestion, collaborator, questions, labels } = this.props;

    var answer = <SocialSentimentSatisfied style={styles.icon} color={styles.iconColor}/>
    if( collaborator.answers[idxQuestion] == 1 ) 
      answer = <SocialSentimentNeutral style={styles.icon} color={styles.iconColor}/>
    else if( collaborator.answers[idxQuestion] == 2 ) 
      answer = <SocialSentimentDissatisfied style={styles.icon} color={styles.iconColor}/>


    return (
      <div  style={styles.root} >

        <div className="row">
          <div className="col-xs-6" style={{padding:0,textAlign:"right"}}>
            {answer}
          </div>
          <div className="col-xs-6" style={{padding:0,textAlign:"left"}}>
            <ResultPie labels={labels} results={questions[idxQuestion].answered} />
          </div>
        </div>

      </div>    
    );
  }
}

function mapStateToProps(state) {
  return {
    collaborator: state.collaborator,
    questions: state.app.questions
  };
}

export default connect(mapStateToProps)(QuestionItemCollaboratorResults);
