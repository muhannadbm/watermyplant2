import {React} from 'react'
import { useState, useEffect } from 'react';
import axiosWithAuth from './../axiosWithAuth/axiosWithAuth'
import styled from 'styled-components'
import { Link, useHistory, Route } from "react-router-dom";
import HomeImage from "./img/img3.jpg"


const Dashboard = (props) => {
	const [plants,setPlants] = useState(null)
	const [watering,setWater] = useState(null)
	const {trigger,setTrigger} = props

	const history = useHistory()

	useEffect(() => {
	    axiosWithAuth().get('https://wmp-api.herokuapp.com/api/plants').then(res =>
	    setPlants(res.data)
	    )
	},[watering,trigger])

	const deletePlant = (e,id) => {
		e.preventDefault()
		axiosWithAuth()
			.delete(`/api/plants/${id}`)
			.then((res) => {
				console.log("Delete success");
				setPlants([...plants]);
				
				history.push("/dashboard");
				setTrigger(!trigger);
				props.setTrigger(!props.trigger)
			})

			.catch((err) => {
				console.log("DELETE ERR", err)
			});
	}

	Date.prototype.addHours= function(h){
	    this.setHours(this.getHours()+h);
	    return this;
	}

	const water = (id) => {
	    axiosWithAuth().put(`https://wmp-api.herokuapp.com/api/plants/${id}`,
	    {lastWatered: new Date().toLocaleString()})
	    .then(res => {
	        var myDate = new Date();
	        console.log(res)
	        setWater(myDate.toString())})

	    .catch( e => console.log(e))
	}

	//style component
	const StyledDash = styled.div`
		background-image: url("${HomeImage}");
		background-size: cover;
		background-position: center;
		height: 80vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		
	`;

	const StyledTable = styled.table`
		margin: auto;
		width: 50%;
		font-family: "Helvetica", cursive, sans-serif;
		border: 2px solid #4f7849;
		background-color: #eeeeee;
		width: 72%;
		text-align: center;
		border-collapse: collapse;
		td,
		th {
			border: 1px solid #4f7849;
			padding: 8px 12px 8px 12px;
		}

		tbody td {
			font-size: 19px;
			font-weight: bold;
			color: #4f7849;
		}
		tr:nth-child(even) {
			background: #cee0cc;
		}
		thead {
			background: #207808;
			background: -moz-linear-gradient(
				top,
				#589a46 0%,
				#368520 66%,
				#207808 100%
			);
			background: -webkit-linear-gradient(
				top,
				#589a46 0%,
				#368520 66%,
				#207808 100%
			);
			background: linear-gradient(
				to bottom,
				#589a46 0%,
				#368520 66%,
				#207808 100%
			);
			border-bottom: 1px solid #444444;
		}
		thead th {
			font-size: 15px;
			font-weight: bold;
			color: #ffffff;
			text-align: center;
			border-left: 0px solid #d0e4f5;
		}
		thead th:first-child {
			border-left: none;
		}
		tfoot td {
			font-size: 21px;
		}
		.water {
			padding: 1rem;
			color: #7AD7F0;
			font-weight: bold;
			cursor: pointer;
			width: 25px;
			height: 25px;
			border-radius: 0 83% 53% 80%;
			border: 2px solid #7AD7F0;
			transform: rotate(45deg);
			margin-top: 12px;
		}
		.water:hover {
			background-color: #53b4ff;
		}
		.edit:hover {
			background-color: #60c260;
		}
		.edit {
			background: #4eb74e;
			border-radius: 50%;
			padding: 0.6rem;
			text-decoration: none;
			color: white;
		}
		.delete:hover {
			background-color: #ffa6a6b0;
		}
		.delete {
			color: red;
			background: #ff9999b0;
			font-weight: bold;
			border-radius: 50%;
			font-size: 1rem;
			padding: 0.6rem;
			border: 0;
			cursor: pointer;
		}
		.message{
			color: #3b8039;
font-weight: bold;
		}
	`;

	return (
		<StyledDash>
			<Route exact path="/"></Route>

			<div>
			

				<div className="tablecontainer">
					{/* <table className="comicGreen"> */}

					<StyledTable>
						<tr>
							<th>Species</th>
							<th>Name</th>
							<th>H2o Interval(hrs)</th>
							<th>H2o Amount</th>
							<th>Last Watered</th>
							<th>Date/Time to be watered</th>
							<th>Water</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
							{ plants && plants.length === 0 ? <tr  className="message"><td colSpan="10">You have no Plants Yet !</td></tr>: null}
						 {plants &&
							plants.map((el) => {
								const date = new Date(Date.parse(el.lastWatered));
								const newdate = new Date(date);
								newdate.addHours(parseInt(el.h2oInterval));

								let valuetostring = null;
								if (el.h2oInterval === "1") {
									valuetostring = "Once every hour";
								} else if (el.h2oInterval === "2") {
									valuetostring = "Once every 2 hours";
								} else if (el.h2oInterval === "3") {
									valuetostring = "Once every 3 hours";
								} else if (el.h2oInterval === "4") {
									valuetostring = "Once every 4 hours";
								}

								const current = new Date();
								let color = "good";

								if (current.getTime()>newdate.getTime()) {
									color = "danger";
								}

								return (
									<tr>
										<td>{el.speciesID}</td>
										<td>{el.nickname}</td>
										<td>Every {el.h2oInterval} {Number(el.h2oInterval) === 1 ? 'Hour': 'Hours'}</td>
										<td>{el.h2oAmount} Litre</td>
										<td>{el.lastWatered}</td>

										<td className={color}>{newdate.toLocaleString()}</td>

										<td>
											<button
												className ="water"
												
												onClick = {() => water(el.plantID)}
											></button>
										</td>
										<td>
											<Link to={`/edit/${el.plantID}`} className="edit">
												Edit
											</Link>
										</td>
										<td>
											<button
												className="delete"
												onClick={(e) => deletePlant(e, el.plantID)}
											>
												X
											</button>
										</td>
									</tr>
								);
							})} 
					</StyledTable>
				</div>
			</div>
		</StyledDash>
	);
}


export default Dashboard