import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import collaborator from './collaborator';
import app from './app';

const rootReducer = combineReducers({
  routing,
  app,
  collaborator
});

export default rootReducer;
