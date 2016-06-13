import { load,receiveClosingTime, cancel } from './home'

export const SET_VISIBILITY = 'SET_VISIBILITY';
export const VALID_SUBMIT = 'VALID_SUBMIT';

export function setVisibility(idQuestion,visible) {
  return {
    type: SET_VISIBILITY,
    payload: {idQuestion: idQuestion,visible: visible}
  };
}

export function validSubmit() {
  return (dispatch,getState) => {

    // get visibilities

    // sendTransaction

    // tx minée
      // -> dispatch( voteSubmitted )

    dispatch(load(true))
  };
}

export function endValid() {
  return (dispatch,getState)=>{
    dispatch( receiveClosingTime() );
    dispatch( cancel() )
  };
}

