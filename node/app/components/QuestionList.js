import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as CollaboratorActions from '../actions/collaboratorActions';

const styles = {
  root: {
    height: "100vh",
    margin: "3vh 3vw",
    textAlign: "center"
  },
	item: {
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
}

export default class QuestionList extends Component {
  render() {
    const { questions } = this.props;


    var quests = questions.map((question) => {

      var questionItem = React.cloneElement(this.props.children,{idQuestion: question.id});

      return (
        <div style={styles.item.root} key={question.id}>
          <span style={styles.item.text}>{question.text}</span>
          <div style={styles.item.sub}>
            {questionItem}
          </div>
        </div>
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
    questions: state.home.questions
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({},CollaboratorActions), dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(QuestionList);

