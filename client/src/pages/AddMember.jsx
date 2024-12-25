import React, { useState } from "react";
import { Form, Input, Button, message, Select } from 'antd';
import { useNavigate } from "react-router-dom";
import CustomLayout from "./CustomLayout";
import { useAuth } from "../contexts/AuthContext";

function AddMember() {
  console.log("Add member component");
  const navigate = useNavigate();
  const { userDetails } = useAuth();
  const [loading, setLoading] = useState(false);
  const [connectedWallets, setConnectedWallets] = useState(['axB10', 'axB21']);

  const onFinish = async (values) => {
    setLoading(true);
    console.log("values>", values);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/addMember`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({...values, isParent: values.isParent === 'true'}),
      });
      const result = await response.json();
      if (response.ok) {
        message.success('Member added successfully!');
        navigate('/my_transactions');
      } else {
        if(response.status === 401){
            message.error('Unauthorized!');
            navigate('/login');
        }else{
        message.error(result.message || 'Something went wrong!');
        }

      }
    } catch (error) {
      message.error('Network error!');
    } finally {
      setLoading(false);
    }
  };

const getContent = () => (
    <Form style={{margin: '10px'}} onFinish={onFinish} layout="vertical">
        <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please input the username!' }]}
        >
            <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please input the password!' }]}
        >
            <Input type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item
            name="isParent"
            label="Is Parent"
            rules={[{ required: true, message: 'Please select if the user is a parent!' }]}
        >
            <Select placeholder="Select if the member is a parent">
                <Select.Option value="true">True</Select.Option>
                <Select.Option value="false">False</Select.Option>
            </Select>
        </Form.Item>
        <Form.Item
            name="walletAddress"
            label="Wallet Address"
            rules={[{ required: true, message: 'Please input the wallet address!' }]}
        >
            <Input type="password" placeholder="Provide the public address of the new member" />
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
                Submit
            </Button>
        </Form.Item>
    </Form>
);

  return (
    <CustomLayout activeTab={'add_member'} content={getContent} />
  );
}

export default AddMember;

// function AddMember(){
//     const [member, setMember] = useState({'name':'', 'address':'', isParent: false});
//     const [userAccount, setUserAccount] = useState('')
//     const {state: {contract, web3, accounts}} = useEth();

//     const addMember = async(e) =>{
//         e.preventDefault();
//         try{
//             console.log("member details>", member);
//             let response = await contract.methods.addMember(member.address, member.isParent, member.name).send({from: userAccount});
//             console.log("response>", response);
//             setMember({'name':'', 'address':'', isParent: false});
//         }catch(err){
//             console.log("error while adding new member>>", err);
//         }
//     }

//     const handleMemberChange = (e)=>{
//         setMember(oldMember => ({...oldMember, [e.target.name]: e.target.value}));
//     }

//     const setParent = (e)=>{
//         setMember(oldMember => ({...oldMember, isParent: (e.target.id === "true")}));
//     }

//     useEffect(() => {
//         const getAccount = async() =>{
//             let myAccounts = await accounts;
//             if(myAccounts){
//                 let firstAccount = myAccounts[0];
//                 setUserAccount(firstAccount);
//             }
//         }
        
//         getAccount();
//       }, [accounts]);

//     return (
//         <form className="m-4">
//             <div className="form-group">
//                 <label>Member Name</label>
//                 <input
//                 type="text"
//                 className="form-control form-control-lg"
//                 placeholder="Enter name"
//                 name="name"
//                 value={member.name}
//                 onChange={handleMemberChange}
//                 />

//                 <label className="mt-4">Account address</label>
//                 <small className="form-text d-block text-muted fs-5">Enter account address of the additional Member</small>
//                 <input
//                 type="text"
//                 className="form-control form-control-lg"
//                 placeholder="Enter address"
//                 name="address"
//                 value={member.address}
//                 onChange={handleMemberChange}
//                 />

//             <Dropdown className="mt-3">
//             <Dropdown.Toggle variant="info" id="dropdown-basic">
//                 Is Parent?
//             </Dropdown.Toggle>

//             <Dropdown.Menu>
//                 <Dropdown.Item id="true" onClick={setParent}>True</Dropdown.Item>
//                 <Dropdown.Item id="false" onClick={setParent}>False</Dropdown.Item>
//             </Dropdown.Menu>
//             </Dropdown>
//             </div>
//             <button onClick={addMember} className="btn btn-primary btn-lg mt-4">Submit</button>
//         </form>
//         )
// }

