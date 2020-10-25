import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom"
import { VisLit } from "./components/VisLit"
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <VisLit />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);