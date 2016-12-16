import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';

import * as HomeActions from '../actions/homeActions';

const styles = {
  title:{
    backgroundColor: "#0A0A0A",
    color: "#967D4D",
    fontWeight: "bold"
  },
  button:{
    padding: 0,
    marginTop: "2vh",
  },
  progress: {
    marginTop: "2vh",
    height: "3vh",
    color: "#967D4D"
  }
}

export class Modal extends Component {
  render() {
    const { loading, hasSubmitted, cancel, onSubmit} = this.props;
    var content = loading ? 
      (
        <LinearProgress  mode="indeterminate" style={styles.progress} color={styles.progress.color}/>  
      ) : 
      (
        <div className="row">
          <RaisedButton label="Oui" secondary={true} className="col-xs-6" style={styles.button} onClick={onSubmit}/>
          <RaisedButton label="Non" className="col-xs-6" style={styles.button} onClick={cancel}/>
        </div>
      )

    var onRequestClose = loading ? null : cancel;
    var title = loading ? "En attente de validation" : "Êtes vous sur de votre choix ?"
    return (
      <Dialog open={hasSubmitted}
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
    hasSubmitted: state.home.hasSubmitted,
    loading: state.home.loading
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(HomeActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Modal);