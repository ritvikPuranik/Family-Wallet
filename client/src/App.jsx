import React, { useState, useEffect } from 'react';

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";


import ShowTransactions from './pages/ShowTransactions';
import MakePayment from "./pages/MakePayment";
import AddMember from './pages/AddMember';
import AuthorizePayment from './pages/AuthorizePayment';
import LoginRegister from './pages/Login';

import AccountDetails from './components/AccountDetail';
import ParentControls from './components/ParentControls';

import useEth from './contexts/EthContext/useEth';
import { useAuth } from './contexts/AuthContext';


// const MyNav = () => {
//   const [isParent, setIsParent] = useState(true);
//   // const [isAuthenticated, setAuthenticated] = useState(false);
//   const { userDetails, setUser } = useAuth();

//   const { state: { contract, accounts, web3 } } = useEth();

//   useEffect(() => {
//     const getAccount = async () => {
//       let myAccounts = await accounts;
//       if (myAccounts) {
//         let firstAccount = myAccounts[0];
//         let memberDetails = await contract.methods.members(firstAccount).call({ from: firstAccount });
//         setIsParent(memberDetails.isParent);
//       }
//     }
//     getAccount();
//   }, [accounts]);

//   return (
//     <>
//       <div className='container-fluid'>
//         <div className="bg-black">
//           <div className=" mx-auto p-4 flex  align-items-center ">
//             <div className="flex items-center">
//               <h1 className="font-bold text-white">Family Wallet</h1>
//               <AccountDetails />
//             </div>
//           </div>
//         </div>

//         <div className="row vh-100">
//           <div className="col-2">
//             <nav className="navbar bg-black vh-100 d-flex flex-column">
//               <ul className='nav navbar-nav mt-initial align-items-center'>
//                 {userDetails && routes.map(({ title, link }, index) => {
//                   return (
//                     <li key={index} className="p-4 nav-item">
//                       <Link className='nav-link text-white' to={link}>{title}</Link>
//                     </li>
//                   );
//                 })}
//                 {/* {userDetails && isParent && <ParentControls />} */}
//               </ul>

//             </nav>
//           </div>

//           {/* <div className="col-10 container">
//             <Routes>
//               <Route path="/login" element={<LoginRegister />} />
//               <Route
//                 path="/"
//                 element={<ShowTransactions />}
//               />
//               <Route
//                 path="payment"
//                 element={
//                   <MakePayment />
//                 }
//               />
//               <Route
//                 path="add_member"
//                 element={
//                   <AddMember />
//                 }
//               />
//               <Route
//                 path="authorize"
//                 element={
//                   <AuthorizePayment />
//                 }
//               />
//             </Routes>
//           </div> */}
//         </div>
//       </div>
//     </>
//   );
// }

function App() {
  const { userDetails, setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  console.log("userDetaisl>", userDetails);

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
