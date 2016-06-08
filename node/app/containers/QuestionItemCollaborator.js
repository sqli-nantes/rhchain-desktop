import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import SocialSentimentSatisfied from 'material-ui/svg-icons/social/sentiment-satisfied';
import SocialSentimentNeutral from 'material-ui/svg-icons/social/sentiment-neutral';
import SocialSentimentDissatisfied from 'material-ui/svg-icons/social/sentiment-dissatisfied';

import * as CollaboratorActions from '../actions/collaborator';

const styles = {
	root:{
    height: "100%",
    textAlign: "center",
    marginTop: "2vh"
	},
  icon: {
    height: "80px",
    width: "80px",
    margin: "0 5vw"
  },
  iconColor: "#EEEEEE",
  selectedIconColor: "black"
}

export default class QuestionItemCollaborator extends Component {

  render() {
    const { setAnswer, idxQuestion, answers } = this.props;

    return (
      <div  style={styles.root} >

        <SocialSentimentSatisfied 
          color={answers[idxQuestion] == 0 ? styles.selectedIconColor : styles.iconColor } 
          style={styles.icon} 
          onClick={() => setAnswer(idxQuestion,0)}/>
        <SocialSentimentNeutral 
          color={answers[idxQuestion] == 1 ? styles.selectedIconColor : styles.iconColor } 
          style={styles.icon} 
          onClick={() => setAnswer(idxQuestion,1)}/>
        <SocialSentimentDissatisfied 
          color={answers[idxQuestion] == 2 ? styles.selectedIconColor : styles.iconColor } 
          style={styles.icon} 
          onClick={() => setAnswer(idxQuestion,2)}/>

      </div>    
    );
  }
}

function mapStateToProps(state) {
  return {
    answers: state.collaborator.answers
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CollaboratorActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(QuestionItemCollaborator);
