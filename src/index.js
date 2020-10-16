import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import { WriteLog } from "./components/WriteLog"
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <WriteLog />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);