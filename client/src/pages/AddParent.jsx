import React, { useState } from "react";

function AddParent(){
    const [address, setAddress] = useState('');

    const addParent = async(e) =>{
        e.preventDefault();
        console.log("Add parent clicked>", )
    }

    const handleAddressChange = (e)=>{setAddress(e.target.value);}

    return (
        <form className="m-4">
            <div className="form-group">
                <label >Account address</label>
                <small id="emailHelp" className="form-text d-block text-muted">Enter account address of the additional Parent</small>
                <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter address"
                name="address"
                value={address}
                onChange={handleAddressChange}
                />

            </div>
            <button onClick={addParent} className="btn btn-primary btn-lg mt-4">Submit</button>
        </form>
        )
}

export default AddParent;