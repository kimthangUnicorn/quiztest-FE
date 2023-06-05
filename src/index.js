import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from './test/Homepage';
import Login from './test/Login';
import NewTest from './test/NewTest';
import CreateTest from './test/CreateTest';
import ShowAllQues from './test/ShowAllQues';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route  path="/test" element={<Homepage />} />
          <Route  path="/newtest" element={<NewTest />} />
          <Route  path="/createtest" element={<CreateTest />} />
          <Route  path="/listques" element={<ShowAllQues />} />

        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
