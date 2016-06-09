import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import ActionVisibilityOff from 'material-ui/svg-icons/action/visibility-off';

import ResultPie from '../components/ResultPie';
import * as AdministratorActions from '../actions/administrator';

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
}

export default class QuestionItemAdministrator extends Component {

  render() {
    const { idxQuestion, questions, labels, visibility, setVisibility } = this.props;

    var visibilityIcon = visibility[idxQuestion] ? 
    (
      <ActionVisibility style={styles.icon}
                        onClick={() => setVisibility(idxQuestion,false)}/>
    ) : 
    (
      <ActionVisibilityOff  style={styles.icon}
                            onClick={() => setVisibility(idxQuestion,true)}/>
    );

    return (
      <div className="row" style={styles.root} >

      	<div className="col-xs-6" style={{padding:0,textAlign:"right"}}>
          <ResultPie labels={labels} results={questions[idxQuestion].answered} />
      	</div>

        <div className="col-xs-6" style={{padding:0,textAlign:"left"}}>
          {visibilityIcon}
        </div>

      </div>    
    );
  }
}

function mapStateToProps(state) {
  return {
    visibility: state.administrator.visibility,
    labels: state.app.labels,
    questions: state.app.questions
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AdministratorActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(QuestionItemAdministrator);

