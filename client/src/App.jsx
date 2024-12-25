import React from 'react';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Result, Button } from 'antd';

import ShowTransactions from './pages/ShowTransactions';
import MakePayment from "./pages/MakePayment";
import AddMember from './pages/AddMember';
import AuthorizePayment from './pages/AuthorizePayment';
import LoginRegister from './pages/Login';

import { useAuth } from './contexts/AuthContext';


function App() {
  const { userDetails } = useAuth();
  const navigate = useNavigate();
  console.log("familyId", userDetails);

  const logoutUser = async () => {
    console.log("loggin out");
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/logout`, { method: 'POST', credentials: 'include' });
      navigate('/login');
    } catch (error) {
      console.error('Error logging out', error);
    }
  }

  return (
    <div id="App">
      <Routes>
        <Route path="/login" element={<LoginRegister />} />
        <Route
          path="/"
          element={userDetails?.id ?<Navigate to="/my_transactions" /> : <Navigate to="/login" />}
        />
        <Route
          path="make_payment"
          element={
            <MakePayment />
          }
        />
        <Route
          path="my_transactions"
          element={
            <ShowTransactions /> 
          }
        />
        <Route
          path="add_member"
          element={
            <AddMember />
          }
        />
        <Route
          path="authorize_payment"
          element={
            <AuthorizePayment /> 
          }
        />

        <Route
          path="not_found"
          element={
            <Result
              status="403"
              title="403"
              subTitle="Sorry, you are not authorized to access this page. You must be added as a member of a family to proceed."
              extra={<Button onClick={logoutUser} type="primary">Logout</Button>}
            />
          }
        />

      </Routes>
    </div>
  );
}


export default App;
