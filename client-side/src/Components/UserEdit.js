import React, { useEffect, useState } from 'react'
import axiosWithAuth from '../axiosWithAuth/axiosWithAuth'
import {
    useHistory
  } from "react-router-dom";
  import styled from 'styled-components';
const StyledDiv = styled.div`
color: #007360;
border: 5px solid white;
margin-top: 3%;
text-align: center;
form{
    display: flex;
    flex-direction: column;
    width: 40%;
    margin: auto;
    input , button{
        width: 40%;
        margin: auto;
    }
    button{
        width: 10%;
        margin-top: 3%;
        padding: 1rem;
        background-color: #007360;
        color: white;
        font-weight: bold;
        cursor: pointer;
        border: none;
    }
}
`

const initialValues = {
    username: '',
    password: '',
    phoneNumber: ''
}

const UserEdit = (props) => {

    const [formValues, setFormValues] = useState(initialValues)
    const[error,setError] = useState(null)
    let history = useHistory();

    const submit = (e) => {
        e.preventDefault()
        axiosWithAuth().put('/api/users', formValues).then( res=>{
          console.log(res.data)
          props.setUser(res.data)
          history.push('/dashboard')
        }).catch( err => {setError(err.response.data['message'])})
      }

    const change = (e)=> {
        const {value,name} = e.target
        setFormValues({...formValues , [name] : value})
      }

    useEffect(()=>{
        axiosWithAuth().get('/api/users')
        .then(res => {setFormValues(res.data)})
        .catch(err => setError(err.response.data['message']))
    }
    , [])

    return(<div>

        <StyledDiv >
          <h2>Edit User Information</h2>
          {error ? <div>{error}</div>: null}
        <form onSubmit={e =>submit(e)}>
            <label>Username</label>
            <input onChange={e=>change(e)} name="username" value={formValues.username}/>
            <label>New Password</label>
            <input type="password" onChange={e=>change(e)} name="password" />
            <label>Phone No:</label>
            <input onChange={e=>change(e)} name="phoneNumber" value={formValues.phoneNumber}/>
            <button>Edit</button>

        </form>
        </StyledDiv>
    </div>)
}

export default UserEdit