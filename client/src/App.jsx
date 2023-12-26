import React, { useState } from 'react';

import { Routes, Route, Link } from "react-router-dom";


import ShowTransactions from './pages/ShowTransactions';
import MakePayment from "./pages/MakePayment";
import Footer from "./components/Footer";
import AccountDetails from './components/AccountDetail';
import ParentControls from './components/ParentControls';
import AddParent from './pages/AddParent';
import AuthorizePayment from './pages/AuthorizePayment';

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
            {routes.map(({ title, link }, index) => {
              return (
                <li key={index} className="p-4 nav-item">
                  <Link  className='nav-link text-white' to={link}>{title}</Link>
                </li>
              );
            })}
            {isParent && <ParentControls />}
            </ul>
            
          </nav>
        </div>

        <div className="col-10 container">
          <Routes>
            <Route path="/" element={<ShowTransactions />} />
            <Route path="payment" element={<MakePayment />} />
            <Route path="add_parent" element={<AddParent />} />
            <Route path="authorize" element={<AuthorizePayment />} />
          </Routes>
        </div>
      </div>
    </div>
    </>
  );
}

function App() {
  return (
    
       <div id="App">
        <div className="container">
          <MyNav />
          <Footer />
        </div>
      </div>
  );
}

export default App;
