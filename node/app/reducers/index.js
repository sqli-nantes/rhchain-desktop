import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import home from './home';
import collaborator from './collaborator';
import administrator from './administrator';
import login from './login';

const rootReducer = combineReducers({
  routing,
  home,
  collaborator,
  administrator,
  login
});

export default rootReducer;
