import React, {useState, useEffect} from "react";
import { Button, Modal, Form } from 'react-bootstrap';
import useEth from "../contexts/EthContext/useEth";


function MakePayment(){
    const { state: {web3, accounts, contract } } = useEth();
    const [documentFile, setDocumentFile] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [txnDetails, setTxnDetails] = useState({"to":"", "amount": 0, purpose: ""});
    const [userAccount, setUserAccount] = useState("");
    const handleClose = () => setShowConfirmation(false);

    const handlePurposeChange = (e)=>{
        setTxnDetails(oldDetails =>({...oldDetails, [e.target.name]: e.target.value }));
    }

    const confirmTxn = async()=>{
        let {to, amount, purpose} = txnDetails;
        amount = amount*10**18;
        console.log("amount to deduct>", amount);
        let response = await contract.methods.newTxn(to, purpose).send({from: userAccount, value: amount});
        console.log("response>", response);
        handleClose();
    }

    const handleFileChange = async(e) =>{setDocumentFile(e.target.files[0])}

    const processQr = async(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('documentFile', documentFile);

        let requestOptions = {
            method: 'POST',
            redirect: 'follow',
            body: formData
        };


    try{
        let response = await fetch(`http://localhost:3000/upload`, requestOptions);
        response = await response.json();
        setTxnDetails({...response, "purpose": ""});

        setShowConfirmation(true);

    }catch(err){
        console.log("error while decoding QR code>>", err);
        alert("error while decoding QR code");
    }
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

    return(
        <>
        <div className="container mt-5">
            <h1>New Payment</h1>
        <form encType="multipart/form-data">
            <div className="form-group">
            <small id="emailHelp" className="form-text d-block text-muted">Upload QR Code</small>
            <div className="custom-file">
                <input type="file" className="custom-file-input" id="documentFile" onChange={handleFileChange} />
                <label className="custom-file-label" htmlFor="documentFile" />
            </div>
            </div>
            <button type="submit" onClick={processQr} className="btn btn-primary btn-lg mt-5">Submit</button>
        </form>
        </div>

        <Modal show={showConfirmation} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Transaction</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <h5 className="text-muted">Please confirm if the below details are correct</h5>
                <Form>
                    <Form.Group className='mt-4' controlId="to">
                    <Form.Label > <h4>To</h4></Form.Label>
                    <Form.Control
                        type="text"
                        name="to"
                        value={txnDetails.to}
                        disabled
                    />
                    </Form.Group>
                    <Form.Group className='mt-4' controlId="amount">
                    <Form.Label className="mb-0"><h4>Amount</h4></Form.Label>
                        <Form.Group className='d-flex align-items-center'>
                        <Form.Control
                            type="number"
                            name="amount"
                            value={txnDetails.amount}
                            disabled
                            />
                        <p className="ml-3">ether</p>
                        </Form.Group>
                    </Form.Group>
                    <Form.Group className='mt-4' controlId="purpose">
                    <Form.Label><h4>Purpose</h4></Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Purpose"
                        name="purpose"
                        value={txnDetails.purpose}
                        onChange={handlePurposeChange}
                    />
                    </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="success" onClick={confirmTxn}>
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal>
        </>
    )
}

export default MakePayment;