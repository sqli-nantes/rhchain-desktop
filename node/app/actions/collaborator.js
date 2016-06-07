export const SET_ANSWER = 'SET_ANSWER';
export const SUBMIT_VOTE = 'SUBMIT_VOTE';
export const VALID_SUBMIT = 'VALID_SUBMIT';
export const CLOSE_VALIDATION = 'CLOSE_VALIDATION';

export function setAnswer(idxQuestion,idxAnswer) {
  return {
    type: SET_ANSWER,
    payload: {idxQuestion: idxQuestion,idxAnswer: idxAnswer}
  };
}

export function submitVote() {
  return {
    type: SUBMIT_VOTE
  };
}

export function validSubmit() {
  return {
    type: VALID_SUBMIT
  };
}

export function closeValidation() {
  return {
    type: CLOSE_VALIDATION
  }
}
