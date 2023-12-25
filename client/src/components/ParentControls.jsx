import React from "react";
import { Link } from "react-router-dom";

function ParentControls() {
    return (
        <>
        <h2 className='text-white'>Parental Controls</h2>
        <ul className='mt-initial'>
        <li key='0' className="p-4">
            <Link  className='nav-link text-white' to='add_parent'>Add Parent</Link>
        </li>
        <li key='1' className="p-4">
            <Link  className='nav-link text-white' to='authorize'>Authorize Payment Request</Link>
        </li>
        </ul>
        </>
    )

}

export default ParentControls;