import React from 'react';
import { Route } from 'react-router-dom';
import Cms from './Cms';

const App = () => (
  <div className="app-routes">
    <Route path="/" component={Cms} />
  </div>
);

export default App;
