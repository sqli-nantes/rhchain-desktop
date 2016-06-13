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
    const { idQuestion, answers, labels, results } = this.props;

    var idAnswer = answers.find((a)=>{return a.idQuestion == idQuestion}).idAnswer;

    if( idAnswer != null ){
      var answer = <SocialSentimentSatisfied style={styles.icon} color={styles.iconColor}/>
      if( idAnswer == 1 ) 
        answer = <SocialSentimentNeutral style={styles.icon} color={styles.iconColor}/>
      else if( idAnswer == 2 ) 
        answer = <SocialSentimentDissatisfied style={styles.icon} color={styles.iconColor}/>
    } else{
      // Pas de vote pour cette questions
    }

    var res = results.find((r)=>{return r.question == idQuestion}).values;

    var pie = res != null ? <ResultPie labels={labels} results={res} /> : null;

    return (
      <div  style={styles.root} >

        <div className="row">
          <div className="col-xs-6" style={{padding:0,textAlign:"right"}}>
            {answer}
          </div>
          <div className="col-xs-6" style={{padding:0,textAlign:"left"}}>
            {pie}
          </div>
        </div>

      </div>    
    );
  }
}

function mapStateToProps(state) {
  return {
    answers: state.collaborator.answers,
    results: state.home.results,
    labels: state.home.answersLabel
  };
}

export default connect(mapStateToProps)(QuestionItemCollaboratorResults);