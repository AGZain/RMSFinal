 
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        console.log("supp");
        console.log(localStorage.getItem('currUser'));
        if (localStorage.getItem('currUser') === null) {
            return <Redirect to={{ pathname: '/loginP', state: { from: props.location } }} />
            
            
        }else{
            return <Component {...props} />
        }
    }} />
)