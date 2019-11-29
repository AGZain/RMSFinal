import React, { Component } from 'react';
import { FormControl, FormGroup, Button } from 'react-bootstrap';
import { BrowserRouter, Router, Route, Switch, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { resolveSoa } from 'dns';
import 'bootstrap/dist/css/bootstrap.min.css';
import"./index.css";

toast.configure()
class Time extends Component{
constructor(props){
  super(props);
  this.state = {time:new Date().toLocaleTimeString()};
}
componentDidMount(){
  setInterval(()=>{this.setState({time:new Date().toLocaleTimeString()})},1000);
}

render()
{
  return(
     <label className="loginfo">{this.state.time}</label>
  )
}
}
class LoginPage extends Component{

    constructor(props){
        super(props);
        this.state = {email:'',password:''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    loginError = () => toast.error("Inccorect Employee ID or password!");
    handleChange(event){

        this.setState({
            [event.target.name]: event.target.value
        });
        console.log(this.state.password);
    }
    handleSubmit(event){
        console.log(localStorage.getItem('currUser'));
        // fetch('/api/checkAlreadyAuth',{
        //     method:'GET',
        //     headers: {
        //         'auth': localStorage.getItem('currUser') || []
        //     }
        // }).then(res => {
        //     if (res.status === 200){
        //         console.log(res.json());
        //         console.log("ALREADY LOGGED IN!!");
        //     }
        // });
        event.preventDefault();
        console.log("submitting login form");
        // console.log(JSON.stringify(this.state));
        fetch('/api/auth',{
            method:'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (res.status === 200){
                return res.json()
            }
        })
        .then((data) => {
            var success = data.success;
            console.log(success);
            if (success == "false"){
                this.loginError();
                this.setState({email:'',password:''});
            }else{
                var employeeNo = JSON.stringify(data.employeeNo);
                var isAdmin = JSON.stringify(data.Admin);
                localStorage.setItem('currUser',employeeNo);
                localStorage.setItem('isAdmin', isAdmin);
                //console.log(JSON.stringify(employeeNo));
                if(localStorage.getItem('currUser')){
                    console.log("user is signed innnn!!" + localStorage.getItem("currUser"));

                    this.props.history.push('/');
                }
            }

            //var respData = res.json();
            // if (res.status === 200){
            //     console.log("SUCCESSSS!!");
            //     console.log(data.message);
            //     localStorage.setItem('currUser',JSON.stringify(data.token));
            // }
        });
    }
    render(){
        return(
          <div className="login">

        <div className="login_header">
         <Time/>
        </div>
            <form onSubmit={this.handleSubmit}>
                <FormGroup className="loginform">
                <label className="loginfo"> Employee Number:</label>
                <br/>
                    <input
                        className="logininfo"
                        autoFocus
                        type="number"
                        name="email"
                        placeholder="Enter Employee Number"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup className="loginform">
                  <label className="loginfo"> Password:</label>
                  <br/>
                    <input
                        className="logininfo"
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <Button variant="secondary" className="login_button" type='submit'>Log In</Button>
            </form>
            </div>
        );
    }
}
export default LoginPage;
