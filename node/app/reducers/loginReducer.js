import { LOGIN, ERROR } from '../actions/loginActions';

const initialState = {
	error: false
}

export default function login(state = initialState, action) {
  switch (action.type) {
    case ERROR:
      return Object.assign({},state,{error: true});
    case LOGIN:
      return Object.assign({},state,{error: false});
    default:
      return state;
  }
}
