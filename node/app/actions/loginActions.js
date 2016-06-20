export const LOGIN = 'LOGIN';

export function login(password) {
  return {
    type: LOGIN,
    payload: {password: password}
  };
}

