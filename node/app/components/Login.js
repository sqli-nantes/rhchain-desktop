import React, { Component } from 'react';
import { Link } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const styles={

  root: {
    backgroundColor: "#e74c3c",
    height: "100%",
    textAlign: "center",
    paddingTop: "35vh",
    color: "white"
  },

  title: {
    fontSize: "3em",
    fontWeight: "bold"
  },

  input: {
    floatingLabelStyle: {
      color: "#ffffff"
    },
    underlineStyle: {
      borderColor: "#ffffff"
    }
  },

  button: {
    marginTop: "2vh"
  }

};

export default class Login extends Component {
  render() {
    return (
      <div style={styles.root}>
        <span className="row" style={styles.title} >RH Chain</span>
        <TextField 
          className="row"
          floatingLabelText="Mot de passe" 
          type="password" 
          floatingLabelStyle={styles.input.floatingLabelStyle}
          floatingLabelFocusStyle={styles.input.floatingLabelStyle}  
          underlineStyle={styles.input.underlineStyle}
          underlineFocusStyle={styles.input.underlineStyle}/>
        <Link className="row" to="/home/collab"> 
          <RaisedButton label="Me Connecter" style={styles.button}/>
        </Link>
      </div>
    );
  }
}
