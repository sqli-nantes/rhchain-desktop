import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Color from 'color';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import SocialSentimentSatisfied from 'material-ui/svg-icons/social/sentiment-satisfied';
import SocialSentimentNeutral from 'material-ui/svg-icons/social/sentiment-neutral';
import SocialSentimentDissatisfied from 'material-ui/svg-icons/social/sentiment-dissatisfied';

import * as CollaboratorActions from '../actions/collaboratorActions';

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
  }
}

export default class QuestionItemCollaborator extends Component {

  render() {
    const { idQuestion, labels, answers, answer } = this.props;

    var params = []

    // id de la réponse à la question donnée
    var idAnswer = answers.find((a)=>{return a.idQuestion == idQuestion}).idAnswer;

    for(var i=0;i<labels.length;i++){
      var iconColor = labels[i].color;
      iconColor = labels[i].id == idAnswer ? iconColor : Color(iconColor).lighten(0.5).hexString()

      var onClick = ()=>{answer(idQuestion,i)} ;

      params.push({
        color: iconColor,
        onClick: onClick
      })

    }

    return (
      <div  style={styles.root} >

        <SocialSentimentDissatisfied 
            color={params[2].color} 
            style={styles.icon} 
            onClick={()=>{answer(idQuestion,2)}}/>
        
        <SocialSentimentNeutral 
            color={params[1].color} 
            style={styles.icon} 
            onClick={()=>{answer(idQuestion,1)}}/>

        <SocialSentimentSatisfied 
            color={params[0].color} 
            style={styles.icon} 
            onClick={()=>{answer(idQuestion,0)}}/>

      </div>    
    );
  }
}

function mapStateToProps(state) {
  return {
    labels: state.home.answersLabel,
    answers: state.collaborator.answers,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CollaboratorActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(QuestionItemCollaborator);