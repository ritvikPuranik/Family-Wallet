import React, { useState, useEffect } from 'react';

import { Routes, Route, Link } from "react-router-dom";


import ShowTransactions from './pages/ShowTransactions';
import MakePayment from "./pages/MakePayment";
import AddMember from './pages/AddMember';
import AuthorizePayment from './pages/AuthorizePayment';
import Login from './pages/Login';

import PrivateRoute from './components/PrivateRoute';
import Footer from "./components/Footer";
import AccountDetails from './components/AccountDetail';
import ParentControls from './components/ParentControls';

import useEth from './contexts/EthContext/useEth';

const routes = [
  {
    title: "Transactions",
    link: "/",
  },
  {
    title: "Make Payment",
    link: "payment",
  },
];

const MyNav = () => {
  const [isParent, setIsParent] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);

  const { state: {contract, accounts, web3} } = useEth();

  useEffect(() => {
    const getAccount = async() =>{
        let myAccounts = await accounts;
        if(myAccounts){
          let firstAccount = myAccounts[0];
          let memberDetails = await contract.methods.members(firstAccount).call({from: firstAccount});
          setIsParent(memberDetails.isParent);
        }
    }
    getAccount();
  }, [accounts]);

  return (
    <>
    <div className='container-fluid'>
      <div className="bg-black">
        <div className=" mx-auto p-4 flex  align-items-center ">
          <div className="flex items-center">
            <h1 className="font-bold text-white">Family Wallet</h1>
            <AccountDetails />
          </div>
        </div>
      </div>
      
      <div className="row vh-100">
        <div className="col-2">
          <nav className="navbar bg-black vh-100 d-flex flex-column">
            <ul className='nav navbar-nav mt-initial align-items-center'>
            {isAuthenticated && routes.map(({ title, link }, index) => {
              return (
                <li key={index} className="p-4 nav-item">
                  <Link  className='nav-link text-white' to={link}>{title}</Link>
                </li>
              );
            })}
            {isAuthenticated && isParent && <ParentControls />}
            </ul>
            
          </nav>
        </div>

        <div className="col-10 container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
            path="/"
            element={
              <PrivateRoute >
                <ShowTransactions />
                {isAuthenticated}
                {setAuthenticated}
              </PrivateRoute>
            }
          />
            <Route
            path="payment"
            element={
              <PrivateRoute >
                <MakePayment />
                {isAuthenticated}
                {setAuthenticated}
              </PrivateRoute>
            }
          />
            <Route
            path="add_member"
            element={
              <PrivateRoute >
                <AddMember />
                {isAuthenticated}
                {setAuthenticated}
              </PrivateRoute>
            }
          />
            <Route
            path="authorize"
            element={
              <PrivateRoute >
                <AuthorizePayment />
                {isAuthenticated}
                {setAuthenticated}
              </PrivateRoute>
            }
          />
          </Routes>
        </div>
      </div>
    </div>
    </>
  );
}

function App() {
  return (
    <>
    
    
       <div id="App">
        <div className="container">
          <MyNav />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
