import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import collaborator from './collaborator';
import administrator from './administrator';
import app from './app';
import login from './login';

const rootReducer = combineReducers({
  routing,
  app,
  collaborator,
  administrator,
  login
});

export default rootReducer;
