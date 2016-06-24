import { load, cancel, showInfo, INFO_TYPES, receiveNewResults, setOver } from './homeActions'

import { submitAnswers, collabEventSubscription, getCollabSubmission } from '../api/geth'




export function subscribeCollabEvents(){
  return (dispatch)=>{
    var onSuccess = (results)=>{
      dispatch(receiveNewResults(results));
      dispatch(setOver(true));
    }

    var onFail = (error)=>{
      dispatch(showInfo(error,INFO_TYPES.ERROR));
    }

    collabEventSubscription(onSuccess,onFail);
  }
}

export function initCollabState(){
  return (dispatch)=>{
    var onResult = (index,questionAnswer)=>{
       dispatch(answer(index,questionAnswer));
    }

    var onSuccess = ()=>{
      dispatch(hasVoted());
    }

    var onFail = (error)=>{
      dispatch(showInfo(error,INFO_TYPES.ERROR));
    }

    getCollabSubmission(onResult,onSuccess,onFail);
  }
}


export const ANSWER = 'ANSWER';
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

export const HAS_VOTED = 'HAS_VOTED';
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
      console.log("submit failed ",message)
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
    dispatch( showInfo("Votre choix a bien été pris en compte",INFO_TYPES.SUCCESS) );
  }
}
