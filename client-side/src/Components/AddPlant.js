import React, {useState} from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import axiosWithAuth from '../axiosWithAuth/axiosWithAuth';
import {useHistory} from "react-router-dom"



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
align-items: flex-start;
background-color: ghostwhite;
width : 350px;
height: 70%;
padding: 2%;
border: 5px solid #007360;
color: #007360;
h2{
    margin: auto;
}
`;
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-weight: bolder;
    width: 300px;
    margin: auto;
    margin-top: 0.1rem;
    input[type="submit"] {
        background-color: #007360;
padding: 0.8rem;
color: white;
border: none;
font-weight: bold;
cursor: pointer;
    }
`;
const StyledEntryBoxes = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .input{
        display: flex;
flex-direction: column;
text-align: center;
margin-bottom: 1rem;
    }

`


const initialValues = {
    speciesID: '',
    h2oInterval: '', 
    h2oAmount: '',
    nickname: '',
    userID: '',
}

export default function AddPlant (){
    const [plant,setPlant] = useState(initialValues)
    const {push} = useHistory()

    const handleInput = e => {
        console.log(plant)
        setPlant({...plant, [e.target.name]: e.target.value})
    }

    const handlePlantAdded = (e) => {

        e.preventDefault()
        axiosWithAuth().post('/api/plants',plant)
        .then(res =>{
            console.log(res.data)
            push('/dashboard')
        })
        .catch(e=>console.log(e))
    }

    return (
        <StyledDiv>
            <Route>
                <StyledCard>
                    <h2>Add Plant</h2>
                    <StyledForm onSubmit={e =>handlePlantAdded(e)}>
                        <StyledEntryBoxes>
                        <div className="input">
                            <label>Plant Name:</label>
                {//could try and bring in the plant name dynamically here from an API, maybe based on user input or add the correct name to the plant list once user submits their plant
                    }   
                                <input type='text'
                                    name='speciesID'
                                    placeholder=''
                                    value={plant.speciesID}
                                    onChange={handleInput}/>
                        </div>
                        <div className="input">
                            <label>Plant's Nickname:</label>
                                <input type='text'
                                name='nickname'
                                placeholder=''
                                value={plant.nickname}
                                onChange={handleInput}/>
                        </div>
                        <div className="input">
                            <label>Watering Amount: </label>
                                <input type='text'
                                name='h2oAmount'
                                placeholder='# of liters'
                                value={plant.h2oAmount}
                                onChange={handleInput}/>
                        </div>
                        <div className="input">
                            <label>Watering Frequency:</label>
                                <input type='text'
                                name='h2oInterval'
                                placeholder='# of hours'
                                value={plant.h2oInterval}
                                onChange={handleInput}/>
                        </div>
                        </StyledEntryBoxes>

                        <input type='submit' value='Save Plant' />
                    </StyledForm>
                </StyledCard>
            </Route>
        </StyledDiv>
    
    )
} 