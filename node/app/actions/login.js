export const LOGIN = 'LOGIN';
export const ERROR = 'ERROR';

export function login() {
  return {
    type: LOGIN,
  };
}

export function error() {
  return {
    type: ERROR
  };
}

