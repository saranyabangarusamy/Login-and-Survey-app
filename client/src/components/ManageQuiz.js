import React, { Component } from "react";
import { connect } from "react-redux";
import MaterialTable from 'material-table';
import {addUserThunk, deleteUserThunk, updateScoreThunk,fetchUsersThunk, addQuestionThunk } from "../js/actions";
import { Typography, Grid, TextField, Button, TextareaAutosize  } from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

  class ManageQuizPage extends Component {    

    constructor(props) {
      super(props);
      this.state = {
        question: "",
        option1:"",option2:"",option3:"",option4:"",is_right:""        
      };   
    }

    handleChange = prop => (event) => {       
      this.setState({ [prop]: event.target.value});
    }
  
    handleRadioChange = (event) =>{      
      this.setState({ is_right: event.target.value});
    }

    handleSubmit = (event) => {
      event.preventDefault();      
      if(this.state.question !== "") 
        {
          this.props.addQuestionThunk({question:this.state.question, 
            option1:this.state.option1, 
            option2:this.state.option2,
            option3:this.state.option3,
            option4:this.state.option4,
          is_right:this.state.is_right});   
          this.setState({question:"", option1:"", option2:"", option3:"", option4:"", is_right:""})
        }
      else
        alert("Please fill the required fields")      
    }
      render()
      {       

        if (!this.props.loggedin) {
          return <Redirect to='/' />
        }

          return((<Grid container direction="column" justify="center"
          alignItems="center" style={{margin:20}}>
              {/* <Typography style={{marginTop:10,marginBottom:30, fontSize:14, fontWeight:'bold'}} >Quiz</Typography>               */}
              <TextareaAutosize aria-label="empty textarea" color="primary"         
                   label= 'Question' style={{fontSize:20}}
                  value={this.state.question}
                  onChange={this.handleChange("question")} 
                  placeholder="Enter Question here" />         

          <Grid container direction="row" justify="center"
          alignItems="center" style={{margin:10}}>
            <Radio onClick={this.handleRadioChange} checked = {this.state.is_right === 'option1'} value="option1"/>
                   <TextField style={{margin:0}}                         
                  label= 'Option 1' color="primary" 
                  value={this.state.option1}                  
                  onChange={this.handleChange("option1")}
                  />    
                  </Grid> 
                  <Grid container direction="row" justify="center"
          alignItems="center" style={{margin:10}}>
            <Radio onClick={this.handleRadioChange} checked = {this.state.is_right === 'option2'} value="option2"/>
                   <TextField style={{margin:0}}                         
                  label= 'Option 2' color="primary" 
                  value={this.state.option2}                  
                  onChange={this.handleChange("option2")}
                  /> 
                  </Grid>
                  <Grid container direction="row" justify="center"
          alignItems="center" style={{margin:10}}>
            <Radio onClick={this.handleRadioChange} checked = {this.state.is_right === 'option3'} value="option3"/>
                   <TextField style={{margin:0}}                         
                  label= 'Option 3' color="primary" 
                  value={this.state.option3}                  
                  onChange={this.handleChange("option3")}
                  /> 
                  </Grid>
                  <Grid container direction="row" justify="center"
          alignItems="center" style={{margin:10}}>
            <Radio onClick={this.handleRadioChange} checked = {this.state.is_right === 'option4'} value="option4"/>
                   <TextField style={{margin:0}}                         
                  label= 'Option 4' color="primary" 
                  value={this.state.option4}                  
                  onChange={this.handleChange("option4")}
                  /> 
                  </Grid>                   
                  <Button style ={{marginTop:10}} variant="contained" color="primary" onClick={this.handleSubmit}>Post Question</Button>        
          </Grid>));
      }      
  }

const mapStateToProps = state => {   
    return { users: state.users ,loggedin:state.loggedin,
    userInfo:state.userInfo};
};

function mapDispatchToProps(dispatch) {
    return {      
      addUserThunk: newUser => dispatch(addUserThunk(newUser)),
      addQuestionThunk: question => dispatch(addQuestionThunk(question)),
      updateScoreThunk: (user,score) => dispatch(updateScoreThunk(user,score)),
      deleteUserThunk: user => dispatch(deleteUserThunk(user))            ,
      fetchUsersThunk: () => dispatch(fetchUsersThunk())      
    };
  }

const ManageQuiz = connect(mapStateToProps,mapDispatchToProps)(ManageQuizPage);
export default ManageQuiz;