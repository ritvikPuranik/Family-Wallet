import React, { useEffect, useState } from "react";
import useEth from "../contexts/EthContext/useEth";


function ShowTransactions(){
    console.log("showing tranasctions");
    const { state: {web3, accounts, contract } } = useEth();
    console.log("accounts>", accounts);
    const [userAccount, setUserAccount] = useState("");
    const [transactions, setTransactions] = useState([]);


    useEffect(()=>{
        const populateData = async()=>{
            let txns = [];
            try{
                let txnLength = await contract.methods.txnCount().call({from: userAccount});
                for(let i=0; i<txnLength; i++){
                    let txnData = await contract.methods.txns(i).call({from: userAccount});
                    // console.log("txnData>", txnData);
                    txns.push(txnData);
                }
            }catch(err){
                console.log("context not yet set>>", err);
            }

            setTransactions(txns);
        }

        const getAccount = async() =>{
            let myAccounts = await accounts;
            if(myAccounts){
                let firstAccount = myAccounts[0];
                console.log("account>", firstAccount);
                setUserAccount(firstAccount);
            }
        }
        getAccount();
        populateData();
    },[accounts]);


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
                    <td>{item.amount/10**18}</td>
                    <td>{item.status}</td>
                </tr>
                ))}
            </tbody>
        </table>
        )
}

export default ShowTransactions;