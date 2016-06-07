import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import LoginPage from './containers/LoginPage';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import CollaboratorPage from './containers/CollaboratorPage';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginPage} />
    <Route path="/home" component={HomePage} >
		<Route path="/home/collab" component={CollaboratorPage} />
    </Route>
    <Route path="/counter" component={CounterPage} />
  </Route>
);
