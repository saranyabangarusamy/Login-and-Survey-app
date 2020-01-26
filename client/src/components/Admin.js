import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../js/actions";
import {Button,TextField,Grid, Typography} from '@material-ui/core';
import { Redirect } from 'react-router-dom'
import ManageQuiz from "./ManageQuiz";
import UsersTable from "./UsersTable";

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {       
    };   
  }
  
  handleManageUsersClick = (event) => {     
    this.setState({ manageUsersClicked : true, manageQuestionsClicked : false });
  }

  handleManageQuestionsClick = (event) => {         
    this.setState({ manageQuestionsClicked : true,manageUsersClicked : false });
  }

  render() {   
    if (!this.props.loggedin) {      
        return <Redirect to='/' />
      }   
    // else if (this.state.manageQuestionsClicked) {
    // return <Redirect to='/manageQuiz' />
    // } 
    // else if (this.state.manageUsersClicked) {
    // return <Redirect to='/manageusers' />
    // } 
    else if (this.props.loggedin && this.props.userInfo.role === "admin") {
        return (    
            <div style={{marginTop:20, marginBottom:20}}>                 
                <Grid container direction="column" justify="center"
                alignItems="center" justifyContent='center' > 
                  <Typography style={{fontSize:20, fontWeight:'bold'}}>Admin</Typography>              
                  <Grid container direction="row" justify="center"
                  alignItems="center" style={{margin:20}}>            
                      <Button variant="contained" color="primary" 
                      style={{marginLeft:20,marginTop:10}}
                      onClick={this.handleManageUsersClick}>Manage Users</Button>                    
                      <Button variant="contained" color="primary" 
                      style={{marginLeft:20,marginTop:10}}
                      onClick={this.handleManageQuestionsClick}>Manage Questions</Button>  
                  </Grid>
{
  (this.state.manageQuestionsClicked) && <ManageQuiz/>
}

{
  (this.state.manageUsersClicked) && <UsersTable/>
}

                 </Grid>           
            </div>
          );
      }                   
  }
}

const mapStateToProps = state => {   
  return { userInfo: state.userInfo,
  loggedin:state.loggedin };
};

function mapDispatchToProps(dispatch) {
    return {
      login: user => dispatch(login(user))         
    };
  }

const Admin = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage);
 
export default Admin;