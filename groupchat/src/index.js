import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css';
import {BrowserRouter} from 'react-router-dom'
import store from './store/store';
import {Provider} from 'react-redux'
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/react-bootstrap/dist/react-bootstrap'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Provider store={store}>
   <BrowserRouter><App /></BrowserRouter> 
   </Provider>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

