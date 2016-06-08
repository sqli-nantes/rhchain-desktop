import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';

import * as AppActions from '../actions/app';

const styles = {
  title:{
    backgroundColor: "#e74c3c",
    color: "white"
  },
  button:{
    padding: 0,
    margin: "2vh 2vw"
  },
  progress: {
    marginTop: "2vh",
    height: "3vh"
  }
}

export default class Modal extends Component {
  render() {
    const {submit, mustWait, onSubmit, askSubmit} = this.props;
    var content = mustWait ? 
      (
        <LinearProgress  mode="indeterminate" style={styles.progress} />  
      ) : 
      (
        <div className="row">
          <RaisedButton label="Oui" primary={true} className="col-xs-5" style={styles.button} onClick={onSubmit}/>
          <RaisedButton label="Non" className="col-xs-5" style={styles.button} onClick={()=>submit(false)}/>
        </div>
      )

    var onRequestClose = mustWait ? (null) : (()=>submit(false));
    var title = mustWait ? "En attente de validation" : "Êtes vous sur de votre choix ?"
    return (
      <Dialog open={askSubmit}
              title={title}
              titleStyle={styles.title}
              onRequestClose={onRequestClose} >
        
          {content}

      </Dialog>
    );
  }
}

function mapStateToProps(state) {
  return {
    askSubmit: state.app.askSubmit,
    mustWait: state.app.mustWait
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(AppActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Modal);