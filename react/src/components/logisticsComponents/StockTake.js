import React, { useState, useEffect} from "react";
import axios from "axios";
import Card from './Card'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import ButtonGroup from "@mui/material/ButtonGroup";
import UndoIcon from '@mui/icons-material/Undo';
import SouthIcon from '@mui/icons-material/South';
import apiEndpoints from "../ApiEndpoints";



function StockTake(props) {

    const [qty, setQuantity] = useState(0)
    const [selectedProject, setSelectedProject] = useState('')
    const [letCounting, setLetCounting] = useState(false)
    const [lastIncrease, setLastIncrease] = useState(0)

    let counterColor = '10px solid orange'
    if (qty == props.projects[selectedProject - 1]?.stock){
        counterColor = '10px solid green'
    }

    const noDisplay = <div></div>

    function count(increase){
        
        setQuantity(qty + increase)
        setLastIncrease(increase)
        }

    function deduct(decrease) {
        setQuantity(qty - decrease)
    }
    
    console.log(counterColor)

    function overwriteStock() {

        console.log('overwriteStock fired')

        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.withCredentials = true;

        axios.patch(apiEndpoints.apiProject + selectedProject + '/', { "stock": parseInt(qty) });

    }

    function handleChange(e) {

        e.preventDefault()
        setSelectedProject(e.target.value)
        setQuantity(0)
        setLetCounting(true)
        console.log(e.target.value)
      }

    
        

    const counter = <div>
        <h3>STOCK COUNT</h3>
        <div className="some-space">
        <ButtonGroup variant="outlined" aria-label="outlined small button group" sx={{marginTop: 2, marginBottom: 6, textAlign: "center"}}>
            <Button variant="outlined" onClick={()=>{count(5)}}>+5</Button>
            <Button variant="outlined" onClick={()=>{count(8)}}>+8</Button>
            <Button variant="outlined" onClick={()=>{count(10)}}>+10</Button>
    </ButtonGroup></div>

    <div className="some-space" ><button className="digit" style={{border: counterColor}} onClick={()=>{count(1)}}>{qty}</button></div>

    <div >
            <UndoIcon variant="outlined" sx={{margin: 1}} fontSize="large" onClick={()=>deduct(parseInt(lastIncrease))}/>
            <SouthIcon variant="outlined" sx={{margin: 1}} fontSize="large" onClick={()=>deduct(1) }/>
        </div>

        <div>
            <Button variant="outlined" onClick={()=>overwriteStock()}> Overwrite stock records </Button>
        </div>

    </div>

    console.log("stocktake", props.projects[selectedProject -1]?.name, selectedProject)

    return <div>

        <Card>

            <h3>Stocktake</h3>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Select Project</InputLabel>
            <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={selectedProject}
            onChange={handleChange}
            label="Project"
            >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            {props.projects.map((option, index) =>(
            <MenuItem value={option.id} key={index}>{option.fg_code + ':  ' +  ' ' + option.name}</MenuItem>))}
            </Select>
        </FormControl>
        <div className="some-space">
            {letCounting? counter: noDisplay}
        </div>
       
        </Card>
        
        
    </div>
}

export default StockTake