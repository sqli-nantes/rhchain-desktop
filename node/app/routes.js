import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Login from './components/Login';
import Home from './components/Home';
import Collaborator from './components/Collaborator';
import Administrator from './components/Administrator';
import Registre from './components/Registre'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Login} />
    <Route path="/home" component={Home} >
		<Route path="/home/collab" component={Collaborator} />
		<Route path="/home/admin" component={Administrator} />
    <Route path="/home/admin/registre" component={Registre} />
    </Route>
  </Route>
);
