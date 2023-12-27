import React, { useState, useEffect } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import useEth from "../contexts/EthContext/useEth";

function AddMember(){
    const [member, setMember] = useState({'name':'', 'address':'', isParent: false});
    const [userAccount, setUserAccount] = useState('')
    const {state: {contract, web3, accounts}} = useEth();

    const addMember = async(e) =>{
        e.preventDefault();
        try{
            console.log("member details>", member);
            let response = await contract.methods.addMember(member.address, member.isParent, member.name).send({from: userAccount});
            console.log("response>", response);
            setMember({'name':'', 'address':'', isParent: false});
        }catch(err){
            console.log("error while adding new member>>", err);
        }
    }

    const handleMemberChange = (e)=>{
        setMember(oldMember => ({...oldMember, [e.target.name]: e.target.value}));
    }

    const setParent = (e)=>{
        setMember(oldMember => ({...oldMember, isParent: (e.target.id === "true")}));
    }

    useEffect(() => {
        const getAccount = async() =>{
            let myAccounts = await accounts;
            if(myAccounts){
                let firstAccount = myAccounts[0];
                setUserAccount(firstAccount);
            }
        }
        
        getAccount();
      }, [accounts]);

    return (
        <form className="m-4">
            <div className="form-group">
                <label>Member Name</label>
                <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter name"
                name="name"
                value={member.name}
                onChange={handleMemberChange}
                />

                <label className="mt-4">Account address</label>
                <small className="form-text d-block text-muted fs-5">Enter account address of the additional Member</small>
                <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter address"
                name="address"
                value={member.address}
                onChange={handleMemberChange}
                />

            <Dropdown className="mt-3">
            <Dropdown.Toggle variant="info" id="dropdown-basic">
                Is Parent?
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item id="true" onClick={setParent}>True</Dropdown.Item>
                <Dropdown.Item id="false" onClick={setParent}>False</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
            </div>
            <button onClick={addMember} className="btn btn-primary btn-lg mt-4">Submit</button>
        </form>
        )
}

export default AddMember;