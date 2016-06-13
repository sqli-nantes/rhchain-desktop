export const SUBMIT = 'SUBMIT';
export const LOAD = 'LOAD';
export const CANCEL = 'CANCEL';

export const FETCH_DATA_HASH = 'FETCH_QUESTIONS_HASH';
export const RECEIVE_DATA_HASH = 'FETCH_QUESTIONS_HASH';

export const FETCH_DATA_STRING = 'FETCH_DATA_STRING';
export const RECEIVE_DATA_STRING = 'RECEIVE_DATA_STRING';

export const RECEIVE_NEW_RESULTS = 'RECEIVE_NEW_RESULTS';

export const RECEIVE_CLOSING_TIME = 'RECEIVE_CLOSING_TIME';

export const SHOW_RESULTS = 'SHOW_RESULTS';


export function submit() {
  return {
    type: SUBMIT
  };
}
export function load(load) {
  return {
    type: LOAD,
    payload: {load: load}
  };
}
export function cancel() {
  return {
    type: CANCEL
  };
}

export function fetchDataHash() {
  return {
    type: FETCH_DATA_HASH
  };
}
export function receiveDataHash(hash) {
  return {
    type: RECEIVE_DATA_HASH
  };
}

export function fetchDataString() {
  return {
    type: FETCH_DATA_STRING
  };
}
export function receiveDataString(strings) {
  return {
    type: RECEIVE_DATA_STRING
  };
}

export function receiveNewResults(results) {
  return {
    type: RECEIVE_NEW_RESULTS,
    payload: {results: results}
  };
}

export function receiveClosingTime() {
  return {
    type: RECEIVE_CLOSING_TIME
  };
}

export function showResults() {
  return {
    type: SHOW_RESULTS
  };
}


