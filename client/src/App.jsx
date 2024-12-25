import React, { useState, useEffect } from 'react';

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";


import ShowTransactions from './pages/ShowTransactions';
import MakePayment from "./pages/MakePayment";
import AddMember from './pages/AddMember';
import AuthorizePayment from './pages/AuthorizePayment';
import LoginRegister from './pages/Login';

import AccountDetails from './components/AccountDetail';

import useEth from './contexts/EthContext/useEth';
import { useAuth } from './contexts/AuthContext';


function App() {
  const { userDetails } = useAuth();

  return (
      <div id="App">
        <Routes>
          <Route path="/login" element={<LoginRegister />} />
          <Route
            path="/"
            element={userDetails?.id ?  <Navigate to="/my_transactions" /> : <Navigate to="/login" />}
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
        </Routes>
      </div>
  );
}


export default App;
