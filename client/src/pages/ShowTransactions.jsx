import React, { useEffect, useState } from "react";

function ShowTransactions(){
    const [transactions, setTransactions] = useState([]);

    useEffect(()=>{
        const populateData = async()=>{
            let txns = [
                {
                "purpose": "Shopping",
                "from": "0xcfaa058F281B3c9b9687cb3F87f0E8ae6187C288",
                "to": "0x229Eca8815A419f83595E09414f5fe1D52543b6e",
                "status": "approved",
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
            setTransactions(txns);
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
                <th className="fs-2">Status</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map((item, index) => (
                <tr key={index}>
                    <td>{item.date}</td>
                    <td className="fs-5">{item.from}</td>
                    <td className="fs-5">{item.to}</td>
                    <td>{item.purpose}</td>
                    <td>{item.amount}</td>
                    <td>{item.status}</td>
                </tr>
                ))}
            </tbody>
        </table>
        )
}

export default ShowTransactions;