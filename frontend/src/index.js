import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.css';
import App from './App';
import reportWebVitals from './utils/reportWebVitals';
import { HashRouter as Router } from "react-router-dom";
import NavigationBar from './components/Navbar/NavigationBar';
import { AuthProvider } from './utils/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
      <AuthProvider>
        <NavigationBar />
         <App />
      </AuthProvider>
    </Router>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example, reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();