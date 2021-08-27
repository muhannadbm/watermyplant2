import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";


//Wrapping our app in the browser router
ReactDOM.render(
  <Router>
    <App/>
  </Router>,
  document.getElementById('root')
);

