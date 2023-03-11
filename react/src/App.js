import React, { useState } from "react"
import Logistics  from "./components/Logistics.js"
import Operations from "./components/Operations.js"
import Quality from "./components/Quality.js"
import Button from '@mui/material/Button';
import { ButtonGroup } from "@mui/material";
import Login from "./components/loginComponents/Login.js";

function App(){

    const [displayLogistics, setDisplayLogistics] = useState(false)
    const [displayOperations, setDisplayOperations] = useState(false)
    const [displayQuality, setDisplayQuality] = useState(false)
    const [displayNavButtons, setDisplayNavButtons] = useState(false)
    const [authToken, setAuthToken] = useState('')
    const [userId, setUserId] = useState('')
    const [userName, setUserName] = useState('')

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const noDisplay = <div></div>

    const login = <Login
        getToken={setAuthToken}
        getUserId={setUserId}
        setAuthenticated={setIsAuthenticated}

    />

    const navButtons = <div>
        <ButtonGroup variant="outlined" aria-label="outlined button group">
            <Button variant="outlined" onClick={()=>{setDisplayLogistics(true); setDisplayOperations(false); setDisplayQuality(false)}}>Logistics</Button>
            <Button variant="outlined" onClick={()=>{setDisplayLogistics(false); setDisplayOperations(true); setDisplayQuality(false)}}>Operations</Button>
            <Button variant="outlined" onClick={()=>{setDisplayLogistics(false); setDisplayOperations(false); setDisplayQuality(true)}}>Quality</Button>
        </ButtonGroup>
    </div>

    console.log("token", authToken)
    console.log("email", userId)

    return (<div className="some-space">

    {isAuthenticated? noDisplay: login}

    {isAuthenticated? navButtons: noDisplay}

    <div id="display-logistics">
        {displayLogistics? <Logistics token={authToken}/>: noDisplay}
    </div>

    <div id="display-operations">
        {displayOperations? <Operations token={authToken}/>: noDisplay}
    </div>

    <div id="display-quality">
        {displayQuality? <Quality token={authToken}/>: noDisplay}
    </div>


    </div>)
}

export default App