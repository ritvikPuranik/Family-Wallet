import React from 'react';
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({children}) => {
    // Fetch this value from localState and set isAuthenticated to true. Set the localState from the login page
    const authed = localStorage.getItem('isLoggedIn');
    console.log("is user logged in>>", authed);
    console.log("childer>", children);
    children[2](authed || false);
    
    return authed ? children[0] : <Navigate to="/login" />;
  }
  

export default PrivateRoute;
