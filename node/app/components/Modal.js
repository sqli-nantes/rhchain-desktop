import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  title:{
    backgroundColor: "#e74c3c",
    color: "white"
  },
  button:{
    padding: 0,
    margin: "2vh 2vw"
    
  }
}

export default class Modal extends Component {
  render() {
    return (
      <Dialog open={false}
              title="Êtes vous sur de votre choix ?"
              titleStyle={styles.title}>
        <div  className="row">
          <RaisedButton label="Oui" primary={true} className="col-xs-5" style={styles.button}/>
          <RaisedButton label="Non" className="col-xs-5" style={styles.button}/>
        </div>
      </Dialog>
    );
  }
}