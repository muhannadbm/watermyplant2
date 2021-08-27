import React, { useState } from 'react';
import axios from 'axios';
import {Route, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import UserAvatar from './img/img1.jpg';
import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);


const StyledDiv = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: ghostwhite;
    width : 350px;
    margin-top: 1rem;
    margin-bottom: 1rem;
    padding: 2%;
    border: 5px solid #007360;
    color: #007360;
    .loginerr{
        background-color: red;
    }
`;

const GreenCircle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:  #007360;
    border-radius: 9999px;
    height: 165px;
    width: 165px;
`;

const ImgCircle = styled.div`
    width: 90%;
    height: 90%;
    background-image: url('${UserAvatar}');
    background-size: cover;
    background-position: center;
    border-radius: 999px;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    font-weight: bolder;
    width: 300px;
    button[type="submit"] {
        background-color: #007360;
padding: 0.8rem;
color: white;
border: none;
font-weight: bold;
cursor: pointer;
    }
    .errormessage{
    margin-top: 5px;
    margin-bottom: 5px;
    color: red;
    background-color: pink;
    width: 75.2%
    }
`;

const StyledEntryBoxes = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    input{
        margin-top: 0.4rem;
margin-bottom: 1rem;
    }


`

const initialFormValues = {
    username: '',
    password: '',
}

const loginSchema = yup.object().shape({
    username : yup.string().required().min('4', 'Username must be at least 4 characters in length'),
    password : yup.string().required().matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters with one uppercase, one number and one special case character"
      ),
})






const Login = (props) => {

    //     //Set up or slices of state//
    const [ formValues, setFormValues ] = useState(initialFormValues);
    const [ errors, setErrors ] = useState(initialFormValues);
    const[loginerr, setloginerr] = useState(null)
    let history = useHistory();

    //Function that validates form entries according to the schema which can be found above//
    const setFormErrors = (name, value) => {
        yup.reach(loginSchema, name).validate(value)
        .then(() => setErrors({...errors,[name]:''}))
        .catch(err => setErrors({...errors, [name]:err.errors[0]}))
    }

    // Function that handles form changes and updates the form and errors//
    const change = event => {
        const {value,name} = event.target;
        setFormErrors(name,value);
        setFormValues({...formValues, [name]:value});
    }

    const submitLogin = (event) => {

        event.preventDefault();

        axios.post('https://wmp-api.herokuapp.com/api/auth/login', formValues).then( res=>{
          console.log(res.data)
          const token = res.data.token;
          localStorage.setItem('token', `"${token}"`);
          props.setLoggedin(true)
          history.push('/dashboard')
        }).catch( err => setloginerr(err.response.data['message']))
      }

    return (
    <StyledDiv>
        <Route exact path = '/userlogin'>
            <StyledCard>
                <GreenCircle>
                    <ImgCircle ></ImgCircle >
                </GreenCircle>
                <div className = 'loginForm'>

                </div>
                {/* Just setting up the basic set up for my user login page */}
                    <h2>Connect With Your Plants</h2>
               
                    <StyledForm onSubmit={submitLogin}>
                    {loginerr ? <div className="errormessage">{loginerr}</div> : null}
                        <StyledEntryBoxes>
                        <label> Username:                          </label>
                            <input 
                            type ='text' 
                            name ="username" 
                            placeholder = ''  
                            value={formValues.username} 
                            onChange={change}></input>


                        {errors.username && <div className="errormessage" >{errors.username}</div>}

                        <label>Password:                         </label>
                        <input 
                        type = 'password' 
                        name="password" 
                        placeholder = 'Case Sensitive'  
                        value={formValues.password} 
                        onChange={change}></input>


                        {errors.password && <div className="errormessage">{errors.password}</div>}
                        </StyledEntryBoxes>
                        <button 
                        type = 'submit'
                        >Login!</button>
                    </StyledForm>
                    
                {/* ****************************************** */}
            </StyledCard>
        </Route>
    </StyledDiv>
    )
}
export default Login