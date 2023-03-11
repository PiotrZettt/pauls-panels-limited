import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import apiEndpoints from '../ApiEndpoints';


function AddNumbers(props) {

    const [number, setNumber] = useState('')
    const [batch, setBatch] = useState('')

    const [showDisplayNumber, setShowDisplayNumber] = useState(false)
    const noDisplay =<div></div>

    const serialNumbers = []

    function add(){
        const serial_number = number + '-' + batch
        serialNumbers.push(serial_number)
        const collection = props.collection

        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.withCredentials = true;

        const data = {"project": props.project, "collection": collection, "serial_number": serial_number}

        axios(
            {
                method: 'POST',
                url: apiEndpoints.apiPartInstance,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + props.token,
                  },
                data: data,
                }
            )
    }

    const displayNumber = <h5>{number} - {batch}</h5>

    const numberInput = <div className="cointainer">
        <h5 ><TextField  className="number" id="outlined-basic" label="No." variant="outlined" onChange={(e)=>{setNumber(e.target.value); setShowDisplayNumber(true)}} />-
        <TextField className="batch" id="outlined-basic" label="Batch" variant="outlined" onChange={(e)=>setBatch(e.target.value)} /></h5>
        
    </div>

    return <div>
        <div>
            {showDisplayNumber? displayNumber: noDisplay}
        </div>
        <div>
            {numberInput}
        </div>
        <div>
            <Button variant="contained" onClick={add}>Add</Button>
        </div>
    </div>


}


export default AddNumbers