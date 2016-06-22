
import { ERROR, ERROR_INPUT, NEW_ACCOUNT, CANCEL_NEW_ACCOUNT } from '../actions/loginActions';

const initialState = {
	error: false,
	errorInput: false,
	newAccount: false
}

export default function login(state = initialState, action) {
  switch (action.type) {
    case ERROR:
      return Object.assign({},state,{error: action.payload.error});
    case ERROR_INPUT:
    	return Object.assign({},state,{errorInput: action.payload.error});
    case NEW_ACCOUNT:
      return Object.assign({},state,{newAccount: true});
  	case CANCEL_NEW_ACCOUNT:
  		return Object.assign({},state,{newAccount: false});
    default:
      return state;
  }
}
