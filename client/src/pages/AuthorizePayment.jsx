import React, { useEffect, useState } from 'react';
import { Table, Button, message } from 'antd';
import CustomLayout from './CustomLayout';
import { useAuth } from '../contexts/AuthContext';

function AuthorizePayment() {
  const { userDetails } = useAuth();
  const [pendingTransactions, setPendingTransactions] = useState([]);

  useEffect(() => {
    const populateData = async () => {
      try {
        let response = await fetch(`${process.env.REACT_APP_API_URL}/getTransactions?status=pending`, {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          response = await response.json();
          setPendingTransactions(response.transactions);
        }
      } catch (err) {
        console.error('Error getting transactions', err);
      }
    };

    populateData();
  }, []);

const handleAction = async (record, isApproved) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/approveOrRejectTransaction`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ transactionId: record.id, isApproved }),
        });
        const result = await response.json();
        if (response.ok) {
            message.success(`${isApproved ? 'Approval' : 'Rejection'} successful!`);
            setPendingTransactions(prev => prev.filter(tx => tx.id !== record.id));
        } else {
            message.error(result.message || 'Something went wrong!');
        }
    } catch (error) {
        message.error('Network error!');
    }
};

  

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'From',
      dataIndex: 'from',
      key: 'from',
    },
    {
      title: 'To',
      dataIndex: 'to',
      key: 'to',
    },
    {
      title: 'Purpose',
      dataIndex: 'purpose',
      key: 'purpose',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => text,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleAction(record, true)}>Approve</Button>
          <Button type="link" onClick={() => handleAction(record, false)}>Reject</Button>
        </span>
      ),
    },
  ];

  const getContent = () => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Table
        style={{ flex: 1 }}
        columns={columns}
        dataSource={pendingTransactions}
        rowKey={(record) => record.id}
        pagination={false}
      />
    </div>
  );

  return (
    <CustomLayout activeTab={'authorize_payment'} content={getContent} />
  );
}

export default AuthorizePayment;


// import React, { useState, useEffect } from "react";
// import useEth from "../contexts/EthContext/useEth";


// function AuthorizePayment(){
//     const { state: {web3, accounts, contract } } = useEth();
//     const [userAccount, setUserAccount] = useState("");
//     const [pendingTxns, setPendingTxns] = useState([]);
//     const [refresh, setRefresh] = useState(false);

//     const authorizeTxn = async(e) =>{
//         console.log("event>", e.target);
//         let isApproved = (e.target.innerHTML === "Approve");
//         console.log("id>", e.target.id);

//         let response = await contract.methods.authorizePayment(e.target.id, isApproved).send({from: userAccount});
//         console.log("response>", response);
//         setRefresh(oldValue=> !oldValue);
//     }

//     useEffect(()=>{
//         const populateData = async()=>{
//             let txns = [];
//             try{
//                 let txnLength = await contract.methods.txnCount().call({from: userAccount});
//                 for(let i=0; i<txnLength; i++){
//                     let txnData = await contract.methods.txns(i).call({from: userAccount});
//                     if(txnData.status === "pending approval"){
//                         txns.push(txnData);
//                     }
//                 }
//             }catch(err){
//                 console.log("context not yet set>>", err);
//             }
//             setPendingTxns(txns);
//         }

//         const getAccount = async() =>{
//             let myAccounts = await accounts;
//             if(myAccounts){
//                 let firstAccount = myAccounts[0];
//                 console.log("account>", firstAccount);
//                 setUserAccount(firstAccount);
//             }
//         }
//         getAccount();
//         populateData();
//     },[accounts, refresh]);
//     return (
//         <table className="table table-striped">
//             <thead>
//                 <tr>
//                 <th className="fs-2">Date</th>
//                 <th className="fs-2">From</th>
//                 <th className="fs-2">To</th>
//                 <th className="fs-2">Purpose</th>
//                 <th className="fs-2">Amount</th>
//                 <th className="fs-2">Action</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {pendingTxns.map((item, index) => (
//                 <tr key={index}>
//                     <td>{item.date}</td>
//                     <td className="fs-5">{item.from}</td>
//                     <td className="fs-5">{item.to}</td>
//                     <td>{item.purpose}</td>
//                     <td>{item.amount/10**18}</td>
//                     <td> <span><button key={item.id} id={item.id} onClick={authorizeTxn} className="btn btn-success">Approve</button></span>     <span><button key={item.id} id={item.id} onClick={authorizeTxn} className="btn btn-danger">Reject</button></span></td>
//                 </tr>
//                 ))}
//             </tbody>
//         </table>
//         )
// }

