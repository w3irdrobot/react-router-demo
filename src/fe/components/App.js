import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Cms from './Cms';
import Login from './Login';

const App = () => (
  <div className="app-routes">
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Cms} />
    </Switch>
  </div>
);

export default App;
