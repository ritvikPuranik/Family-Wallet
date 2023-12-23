import { useEffect, useState } from "react";
import useEth from "../contexts/EthContext/useEth";

function AccountDetails(){
    // console.log("useEth>", useEth());
    const [userAccount, setUserAccount] = useState("");
    const [accountBalance, setAccountBalance] = useState("");
    const { state: {web3, accounts } } = useEth();

    
    useEffect(() => {
        const getAccount = async() =>{
            let myAccounts = await accounts;
            if(myAccounts){
                let firstAccount = myAccounts[0];
                let balance = await web3.eth.getBalance(firstAccount);
                balance = web3.utils.fromWei(balance, 'ether');
                console.log("account>", firstAccount);
                // console.log("balance>", balance);
                setUserAccount(firstAccount);
                setAccountBalance(balance);
            }
        }
        
        getAccount();
      }, [accounts]);

    return(
        <div >
            <h4 className="text-white ">Your Account: {userAccount}</h4>
        </div>
        )
}

export default AccountDetails;