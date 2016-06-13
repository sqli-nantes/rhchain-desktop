import { load, cancel } from './home'

export const ANSWER = 'ANSWER';
export const HAS_VOTED = 'HAS_VOTED';


export function answer(idQuestion,idAnswer) {
  return { 
    type: ANSWER,
    payload: {idQuestion: idQuestion,idAnswer: idAnswer}
  };
}

export function hasVoted(){
  return {
    type: HAS_VOTED
  };
}


export function validSubmit() {
  return (dispatch,getState) => {

    // get choice

    // sendTransaction 

    // tx minée 
      // -> dispatch( voteSubmitted )

    dispatch(load(true));
    
  };
}

export function voteSubmitted(){
  return (dispatch,getState) => {
    dispatch( hasVoted() );
    dispatch( cancel() );
  }
}
