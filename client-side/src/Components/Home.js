import {Route} from 'react-router-dom';
import styled from 'styled-components';
import HomeImage from './img/img2.jpg';


const StyledHome = styled.div`
background-image: url('${HomeImage}');
background-size: cover;
background-position: center;
height: 80vh;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
`
const StyledDiv = styled.div`
padding: 5%;
color: white;
border: 5px solid white;
margin 3%;
`

const Home = () => {

    return (
        
        <StyledHome>
            {/* Just setting up my home page with the correct dom link */}
            <Route exact path = '/'>
                <StyledDiv >
                    <h1>Your number one choice to help make sure you keep your plants alive!</h1>
                </StyledDiv>
            </Route>
            {/* ****************************************** */}
        </StyledHome>
    )
}

export default Home