export const SET_ANSWER = 'SET_ANSWER';
export const VALID_SUBMIT = 'VALID_SUBMIT';
export const END_VALID = 'END_VALID';
export const SHOW_RESULTS = 'SHOW_RESULTS';

export function setAnswer(idxQuestion,idxAnswer) {
  return {
    type: SET_ANSWER,
    payload: {idxQuestion: idxQuestion,idxAnswer: idxAnswer}
  };
}

export function validSubmit() {
  return {
    type: VALID_SUBMIT
  };
}

export function endValid() {
  return {
    type: END_VALID
  };
}

export function showResults() {
  return {
    type: SHOW_RESULTS
  };
}

