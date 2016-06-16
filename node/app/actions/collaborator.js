import { load, cancel, showInfo, INFO_TYPES } from './home'

import { submitAnswers } from '../api/geth'

export const ANSWER = 'ANSWER';
export const HAS_VOTED = 'HAS_VOTED';


export function answer(idQuestion,idAnswer) {

  return (dispatch,getState)=>{ 
    if( !getState().collaborator.hasVoted ) {
      dispatch({
        type: ANSWER,
        payload: {idQuestion: idQuestion,idAnswer: idAnswer}
      });
    }
  };
}

export function hasVoted(){
  return {
    type: HAS_VOTED
  };
}


export function validSubmit() {
  return (dispatch,getState) => {

    const {collaborator} = getState();
    var answers = collaborator.answers.map((a)=>{return a.idAnswer});
    
    dispatch(load(true));

    var onSuccess = ()=>{
      dispatch(voteSubmitted())
    };
    var onFail = (message)=>{
      dispatch(cancel());
      dispatch(showInfo(message,INFO_TYPES.ERROR));
    };

    submitAnswers(answers,onSuccess,onFail);
  };
}

export function voteSubmitted(){
  return (dispatch,getState) => {
    dispatch( hasVoted() );
    dispatch( cancel() );
  }
}
