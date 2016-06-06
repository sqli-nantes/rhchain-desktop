import React, { Component } from 'react';

import QuestionItem from './QuestionItem'

const styles = {
  root: {
    height: "100vh",
    margin: "3vh 3vw"
  },
	item: {
		width: "100vw"
	}
}

export default class QuestionList extends Component {
  render() {
    return (
      <div style={styles.root} > 
        <QuestionItem text="Êtes-vous satisfait(e) de l’ambiance de travail au sein de l’agence ?"/>
        <QuestionItem text="Êtes-vous satisfait(e) des informations qui vous sont transmises, concernant la situation et les perspectives de l’agence et du groupe ?"/>
        <QuestionItem text="Êtes-vous satisfait(e) de votre mission actuelle ?"/>
      </div>
    );
  }
}
