import React, { Component } from 'react';

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
    height: "80px",
    width: "80px",
    margin: "0 5vw"
  }
}

export default class QuestionItemSub extends Component {
  render() {
    return (
      <div style={styles.root} >

        <SocialSentimentSatisfied  style={styles.icon} />
        
        <SocialSentimentNeutral style={styles.icon}/>
        
        <SocialSentimentDissatisfied style={styles.icon}/>

      </div>    
    );
  }
}



/*
 
*/