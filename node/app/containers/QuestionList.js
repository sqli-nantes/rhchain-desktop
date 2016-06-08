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
    const { questions, labels } = this.props;
    var quests = questions.map((question,index) => {
      var subItem = React.cloneElement(this.props.children,{idxQuestion:index,questions:questions,labels: labels});
      return (
        <QuestionItem text={question.text} key={index}>
          {subItem}
        </QuestionItem>
      )
    })
    return (
      <div style={styles.root} > 
        {quests}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    questions: state.app.questions,
    labels: state.app.labels
  };
}

export default connect(mapStateToProps)(QuestionList);

