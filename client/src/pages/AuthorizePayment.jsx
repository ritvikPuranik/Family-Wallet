import React, { useState, useEffect } from "react";

function AuthorizePayment(){
    const [pendingTxns, setPendingTxns] = useState([]);

    const approveTxn = async(e)=>{
        console.log("txn approved>>", e.target.id);
    }
    const rejectTxn = async(e)=>{
        console.log("txn rejected>>", e.target.id);
    }

    useEffect(()=>{
        const populateData = async()=>{
            let txns = [
                {
                "purpose": "Shopping",
                "from": "0xcfaa058F281B3c9b9687cb3F87f0E8ae6187C288",
                "to": "0x229Eca8815A419f83595E09414f5fe1D52543b6e",
                "status": "requested",
                "amount": "3 ether",
                "date": "23rd Dec"
            },
            {
                "purpose": "Movie",
                "from": "0xcfaa058F281B3c9b9687cb3F87f0E8ae6187C288",
                "to": "0x229Eca8815A419f83595E09414f5fe1D52543b6e",
                "status": "requested",
                "amount": "1 ether",
                "date": "21st Dec"
            }];
            setPendingTxns(txns);
        }

        populateData();
    },[]);
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                <th className="fs-2">Date</th>
                <th className="fs-2">From</th>
                <th className="fs-2">To</th>
                <th className="fs-2">Purpose</th>
                <th className="fs-2">Amount</th>
                <th className="fs-2">Action</th>
                </tr>
            </thead>
            <tbody>
                {pendingTxns.map((item, index) => (
                <tr key={index}>
                    <td>{item.date}</td>
                    <td className="fs-5">{item.from}</td>
                    <td className="fs-5">{item.to}</td>
                    <td>{item.purpose}</td>
                    <td>{item.amount}</td>
                    <td> <span><button key={index} id={index} onClick={approveTxn} className="btn btn-success"> Approve</button></span>     <span><button key={index} id={index} onClick={rejectTxn} className="btn btn-danger"> Reject</button></span></td>
                </tr>
                ))}
            </tbody>
        </table>
        )
}

export default AuthorizePayment;