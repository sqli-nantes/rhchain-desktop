import React, { Component } from 'react';

import QuestionItemSub from './QuestionItemSub'

const styles = {
	root: {
    height: "20vh",
    marginBottom: "3vh"
	},
  text:{
    height: "30%",
    fontSize: "1.3em"
  },
  sub: {
    height: "70%"
  }
}

export default class QuestionItem extends Component {
  render() {
    return (
    	<div style={styles.root}>
        <span style={styles.text}>{this.props.text}</span>
        <div style={styles.sub}>
          <QuestionItemSub />
        </div>
      </div>
    );
  }
}
