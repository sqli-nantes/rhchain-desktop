import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import home from './homeReducer';
import collaborator from './collaboratorReducer';
import administrator from './administratorReducer';
import login from './loginReducer';

const rootReducer = combineReducers({
  routing,
  home,
  collaborator,
  administrator,
  login
});

export default rootReducer;
