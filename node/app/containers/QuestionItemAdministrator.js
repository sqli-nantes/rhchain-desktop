import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Color from 'color';

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
    margin: "0 5vw",
    color: "#000000"
  },
}

export default class QuestionItemAdministrator extends Component {

  render() {
    const { idQuestion, visibility, setVisibility, results, labels, over } = this.props;

    var visibleData = visibility.find((v)=>{return v.idQuestion == idQuestion});
    if( visibleData != null ){
      var visibilityIcon; 
      if( visibleData.visible ){
        var visibilityIconAction = over ? ()=>setVisibility(idQuestion,false) : null;
        var visibilityIconColor = over ? Color(iconColor).lighten(0.5).hexString() : styles.icon.color;
        visibilityIcon = <ActionVisibility  style={styles.icon}
                                            onClick={visibilityIconAction}
                                            color={visibilityIconColor}/>
      }
      else {
        var visibilityIconAction = over ? ()=>setVisibility(idQuestion,true) : null;
        visibilityIcon = <ActionVisibilityOff style={styles.icon}
                                              onClick={visibilityIconAction}
                                              color={visibilityIconColor}/>
      }
    }

    var res = results.find((r)=>{return r.question == idQuestion});
    res = res ? res.values : null;

    return (
      <div className="row" style={styles.root} >

      	<div className="col-xs-6" style={{padding:0,textAlign:"right"}}>
          <ResultPie labels={labels} results={res} />
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
    over: state.home.over,
    visibility: state.administrator.visibility,
    results: state.home.results,
    labels: state.home.answersLabel
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AdministratorActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(QuestionItemAdministrator);

