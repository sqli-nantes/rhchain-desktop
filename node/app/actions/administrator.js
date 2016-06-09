export const SET_VISIBILITY = 'SET_VISIBILITY';
export const VALID_SUBMIT = 'VALID_SUBMIT';
export const END_VALID = 'END_VALID';

export function setVisibility(idxQuestion,visible) {
  return {
    type: SET_VISIBILITY,
    payload: {idxQuestion: idxQuestion,visible: visible}
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

