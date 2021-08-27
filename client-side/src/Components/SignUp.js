import { Route } from 'react-router-dom'
import React, {useState} from 'react'
import styled from 'styled-components';
import axios from 'axios';


const StyledDiv = styled.div`
height: 80vh;
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

padding: 2%;
border: 5px solid #007360;

color: #007360;
`;
const StyledForm = styled.form`
margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 150px;
    font-weight: bolder;
    width: 300px;
    input[type="submit"] {
        background-color: #007360;
padding: 0.8rem;
color: white;
border: none;
font-weight: bold;
cursor: pointer;
margin-top: 1.4rem;
    }
    .errormessage{
    margin-top: 1rem;
    margin-bottom: 1rem;
    color: red;
    background-color: pink;
    width: 75.2%;
    padding: 1rem;
    }
`;
const StyledEntryBoxes = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100px;
    .input{
        display: flex;
        flex-direction: column;
        text-align: center;
    }
`
const initialValues = {
    username: '',
    password: '',
    phoneNumber: '',
}

export default function SignUp (props){

    const {formvalues,change,submit} = props


    const[errors,setErrors] = useState(null)
    const [newUser, setNewUser] = useState(initialValues)

    const handleInput = e => {
        setNewUser({...newUser, [e.target.name]: e.target.value})
    }
//     const createUserSubmit = e => {
//         e.preventDefault()
// axios.post('')
//         return setNewUser(initialValues)
//     }

    const register = (e) => {
        e.preventDefault()
        axios.post('https://wmp-api.herokuapp.com/api/auth/register', formvalues)
        .then( res=>{
          props.history.push('/userlogin')
        }).catch( err => {setErrors(err.response.data['message'])})
      }


    return (
        <StyledDiv>
                <StyledCard>
                    <h2>Sign up</h2>
                    <StyledForm onSubmit={register}>
                        {errors ? <div className="errormessage">{errors}</div> : null}
                        <StyledEntryBoxes>
                            <div className="input">
                            <label>Username:</label>
                                <input 
                      name ="username" type="text" value={formvalues.username} onChange={(e)=>change(e)} 
                                />
                      </div>
                            <div className="input">
                                <label>Password:</label>
                                <input 

                         name="password" type="password" value={formvalues.password} onChange={(e)=>change(e)}

                                />
                            </div>
                            <div className="input">
                                <label>Phone Number:</label>
                                <input 

                               name="phoneNumber" type="text" value={formvalues.phoneNumber} onChange={(e)=>change(e)}

                                />
                            </div>
                        </StyledEntryBoxes>
                        <input type='submit' value="Create User" />
                    </StyledForm>
                </StyledCard>
        </StyledDiv>
    )
} 