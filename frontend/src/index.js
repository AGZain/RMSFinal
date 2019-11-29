import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Router, Route, Switch, Redirect } from 'react-router-dom';
import App from './App';
import './index.css';
import LoginPage from './LoginPage';
import { PrivateRoute } from './PrivateRoute';
ReactDOM.render(

  <BrowserRouter>
    <switch>
      <Route path="/loginP" exact component={LoginPage} />
      <PrivateRoute exact path="/" component={App} />
    </switch>
  </BrowserRouter>,
 // <App/>,
  document.getElementById('root')
);
