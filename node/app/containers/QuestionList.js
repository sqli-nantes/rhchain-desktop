import React, { Component } from 'react';
import { connect } from 'react-redux';

import QuestionItem from '../components/QuestionItem'

const styles = {
  root: {
    height: "100vh",
    margin: "3vh 3vw",
    textAlign: "center"
  },
	item: {
		width: "100vw"
	}
}

export default class QuestionList extends Component {
  render() {
    var questions = this.props.questions.map((question,index) => {
      var subItem = React.cloneElement(this.props.children,{idxQuestion:index});
      return (
        <QuestionItem text={question.text} key={index}>
          {subItem}
        </QuestionItem>
      )
    })
    return (
      <div style={styles.root} > 
        {questions}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    questions: state.app.questions
  };
}

export default connect(mapStateToProps)(QuestionList);

