import React, { useState, useEffect } from "react";
import Wip from "./opeationComponents/Wip";
import { TextField, Button } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from "axios";
import apiEndpoints from "./ApiEndpoints";
import { Tab } from "bootstrap";

function Operations(props){

    const projectUrl = 'api/Project/'
    const customerUrl = 'api/Customer/'
    const usersUrl = 'api/Users/'

    const [customers, setNewCurrentCustomers] = useState([])
    const [projects, setNewCurrentProjects] = useState([])
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState(null)

    const [searchedNumber, setSearchedNumber] = useState('')
    const [searchedOperation, setSearchedOperation] = useState([{"project": '', "serial_number": '', "completion": '', "comments": '', "operator": '', "date": ''}])
    const [showWip, setShowWip] = useState(true)
    const [showSearchOutput, setShowSearchOutput] = useState(false)

    const [displaySearch, setDisplaySearch] = useState(false)
    const noDisplay = <div></div>

    const token = props.token

    console.log("users", users)


    useEffect(()=>{
        getData(projectUrl, setNewCurrentProjects);
        getData(customerUrl, setNewCurrentCustomers);
        getData(usersUrl, setUsers);
        getCurrentUser();
    }, []);

    function getData(url, f) {
        
        axios(
            {
            method: 'GET',
            url: url,
            headers: {
                'Authorization': 'Token ' + token
            }
            }
        ).then((response) => {
            const data = response.data;
            f(data)
        }).catch((error) => {
            if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
            }
        });
    };

    function getCurrentUser() {
        
        axios(
            {
            method: 'GET',
            url: 'api/user/',
            headers: {
                'Authorization': 'Token ' + token
            }
            }
        ).then((response) => {
            const data = response.data;
            setCurrentUser(data["user"])
            console.log("current user", data["user"])
        }).catch((error) => {
            if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
            }
        });
    };

    function getPart() {
        axios(
            {
            method: 'GET',
            url: apiEndpoints.apiOperation,
            headers: {
                'Authorization': 'Token ' + token
            }
            }
        ).then((response) => {
            const data = response.data;
            const searchedPart = data.filter(part=>(part.serial_number === searchedNumber))
            console.log("getPart has been fired and the data is: ", data, "and response is: ", searchedPart)
            setSearchedOperation(searchedPart)
        }).catch((error) => {
            if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
            }
            
        }
        );
        setShowSearchOutput(true)

    }
    const wip = 
    <div className="box">
        <Wip
        customers={customers}
        projects={projects}
        user={currentUser}
        endpoint='api/Operation/'
        setSearchOutputDisplay={setShowSearchOutput}
        />
    </div>

    const searchOutput = <div>

        <div className="container">
                <table>
                {searchedOperation.map((part, index) => (
                    <tbody key={index}>
                        
                        <tr>
                            <td className="left">PROJECT</td>
                            <td className="right">{projects[part.project -1]?.name}</td>
                        </tr>
                        <tr>
                            <td className="left">S/N</td>
                            <td className="right">{part.serial_number}</td>
                        </tr>
                        <tr>
                            <td className="left">Task</td>
                            <td className="right">{part.completion}</td>
                        </tr>
                        <tr>
                            <td className="left">COMMENTS</td>
                            <td className="right">{part.comments}</td>
                        </tr>
                        <tr>
                            <td className="left">OPERATOR</td>
                            <td className="right">{users[part.operator - 1]?.username}</td>
                        </tr>
                        <tr>
                            <td className="left">DATE</td>
                            <td className="right">{String(part.date_signed).slice(0, 10)}</td>
                        </tr>
                        
                    </tbody>
                    ))}
                </table>
        </div>
        

    </div>


    const searchInput = <div className="some-space">
        <TextField id="outlined-basic" label="Serial Number" variant="outlined" onChange={(e)=>{setSearchedNumber(e.target.value)}} />
        <Button variant="contained" sx={{margin: 2}} onClick={getPart}>Search</Button>
    </div>

    const showHideSwitch = <div className="some-space">
        <Button variant="outlined" sx={{margin: 5, width : 100}} onClick={()=>{setDisplaySearch(!displaySearch); setShowWip(!showWip)}}>{displaySearch?  "Hide Search": "Search"}</Button>
    </div>

    return <div>
            <h4>Operations it is</h4>
            <p>
            Record what's being done.
            Find what has been done.
            </p>
            <div className="container">
            {showWip? wip: noDisplay}

            <div className="box">
                {showHideSwitch}
            </div>
            </div>

            <div className="some-space">
                {displaySearch? searchInput: noDisplay}
            </div>

            <div>
                {showSearchOutput? searchOutput: noDisplay}
            </div>
    </div>
}

export default Operations