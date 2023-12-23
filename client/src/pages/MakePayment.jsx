import React, {useState, useEffect} from "react";

function MakePayment(){
    const processQr = async(e)=>{
        e.preventDefault();
        console.log("Entered QR code>>>", e.target);
    }

    return(
        <div className="container mt-5">
            <h1>New Payment</h1>
        <form>
            <div className="form-group">
            <small id="emailHelp" className="form-text d-block text-muted">Upload QR Code</small>
            <div className="custom-file">
                <input type="file" className="custom-file-input" id="documentFile" />
                <label className="custom-file-label" htmlFor="documentFile" />
            </div>
            </div>
            <button type="submit" onClick={processQr} className="btn btn-primary btn-lg mt-5">Submit</button>
        </form>
        </div>
    )

}

export default MakePayment;