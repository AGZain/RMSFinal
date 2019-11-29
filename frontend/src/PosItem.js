import React, { Component } from 'react';
import { FormControl, FormGroup, Button } from 'react-bootstrap';
import { BrowserRouter, Router, Route, Switch, Redirect } from 'react-router-dom';
//import { resolveSoa } from 'dns';

class PosItem extends Component{
    
    
    render(){
        return(
            <div>
                <h2>{this.props.item}</h2> 
                <p>${this.props.price}</p>
                {/* <h2>$100</h2> */}
                <p>______________________</p>
            </div>
        );
    }
}
export default PosItem;