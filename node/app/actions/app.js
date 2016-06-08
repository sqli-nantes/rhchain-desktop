export const SUBMIT = 'SUBMIT';
export const WAIT = 'WAIT';


export function submit(submit) {
  return {
    type: SUBMIT,
    payload: {askSubmit: submit}
  };
}

export function wait(wait) {
  return {
    type: WAIT,
    payload: {mustWait: wait}
  };
}
