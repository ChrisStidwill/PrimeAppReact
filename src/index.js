// imports too cluttered? have one 'import' file for shared imports...
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App, ReactLogo, PlanetsVisualisation, CurrentNumberDisplay} from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <PlanetsVisualisation value='true' />
    <PlanetsVisualisation value='false' />
    <CurrentNumberDisplay/><br></br><br></br>
  </React.StrictMode>
);




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
