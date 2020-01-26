import React, { Component } from "react";
import { connect } from "react-redux";
import { addUserThunk } from "../js/actions";
import {Button,TextField,Grid, Typography} from '@material-ui/core';
import { Redirect } from 'react-router-dom';

class ConnectedSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password:"",email:"",contactno:"",confirmpassword:"",
      signedUp:false, validMail :true, validContactNo:true, validPwd :true
    };   
  }
 
  handleChange = prop => (event) => { 
    let validMail,validContactNo,validPwd;
    if(prop === 'email') 
    {
      let regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      validMail = (regex.test(event.target.value));
      this.setState({ [prop]: event.target.value, validMail:validMail });
    } 
    else if(prop === 'contactno') 
    {      
      let regex = /^\+?[0-9]{10,13}$/i;       
      validContactNo = (regex.test(event.target.value));
      this.setState({ [prop]: event.target.value, validContactNo:validContactNo });
    }    
    else if(prop === 'password') 
    {                 
      validPwd = (event.target.value === this.state.confirmpassword);
      this.setState({ [prop]: event.target.value, validPwd:validPwd });
    } 
    else if(prop === 'confirmpassword') 
    {                 
      validPwd = (event.target.value === this.state.password);
      this.setState({ [prop]: event.target.value, validPwd:validPwd });
    }  
    else
    this.setState({ [prop]: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();      
    if(this.state.username !== "" && this.state.password!== "" &&
     this.state.validContactNo && this.state.validMail) 
      {
        this.props.addUserThunk({userName:this.state.username, password:this.state.password, email:this.state.email, contactno:this.state.contactno});        
      }
    else
      alert("Please fill the required fields")
    this.setState({ username : "", password:"" });
  }

  render() {           
    if (this.props.signedUp) {      
      return <Redirect to='/' />
    }
    return (    
       (<Grid container direction="column" justify="center"
       alignItems="center" style={{margin:20}}>      
        <Typography style={{fontSize:14, fontWeight:'bold'}}>SIGNUP</Typography>       
                  <TextField   color="primary"         
                   label= 'User Name' style={{margin:20}}
                  value={this.state.username}
                  onChange={this.handleChange("username")}
                  />  
                   <TextField style={{margin:20}}                         
                  label= 'Email' color="primary" 
                  value={this.state.email} 
                  error={(this.state.validMail)?false:true}
                  helperText={(this.state.validMail)?"":"Incorrect Email Id."}
                  onChange={this.handleChange("email")}
                  />                                  
                  <TextField      color="primary" 
                  minlength = '10' maxlength = '13' 
                   label= 'Contact No' style={{margin:20}}
                  value={this.state.contactno}
                  error={(this.state.validContactNo)?false:true}
                  helperText={(this.state.validContactNo)?"":"Incorrect Contact No."}
                  onChange={this.handleChange("contactno")}
                  />  
                   <TextField style={{margin:20}} required={true}      
                  label= 'Password' color="primary" type="password"
                  value={this.state.password}
                  error={(this.state.validPwd)?false:true}
                  helperText={(this.state.validPwd)?"":"Pls Check Password"}
                  onChange={this.handleChange("password")}
                  />                                  
                  <TextField  color="primary" style={{margin:20}} required={true}   
                   label= 'Confirm Password' type="password"
                  value={this.state.confirmpassword}
                  error={(this.state.validPwd)?false:true}                  
                  onChange={this.handleChange("confirmpassword")}
                  />                                          
              <Button variant="contained" color="primary" onClick={this.handleSubmit}>SIGNUP</Button>        
      </Grid>)
    );
    
  }
}

const mapStateToProps = state => {   
  return {signedUp:state.signedUp, };
};

function mapDispatchToProps(dispatch) {
    return {
      addUserThunk: user => dispatch(addUserThunk(user))      
    };
  }

const Signup = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedSignup);
 
export default Signup;