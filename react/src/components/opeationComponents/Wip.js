import React, {useState, useEffect} from "react";
import axios from "axios";
import {Select, TextField, FormControl, InputLabel, MenuItem, Button } from "@mui/material";
import Card from '../logisticsComponents/Card'


function Wip(props){

    const [selectedProject, setSelectedProject] = useState('')
    const [serialNumber, setSerialNumber] = useState('')
    const [completion , setCompletion] = useState('')
    const [comment, setComment] = useState('')

    const [displaySerial, setDisplaySerial] = useState(false)
    const [displayTask, setDisplayTask] = useState(false)
    const [displayComment, setDisplayComment] = useState(false)
    const [displaySaveButton, setDisplaySaveButton] = useState(false)

    const noDisplay = <div></div>

    const date = new Date().toISOString()

    const data = {"operator": props.user, "project": selectedProject, "serial_number": serialNumber, "completion": completion, "comments": comment, "date_signed": date}
    console.log(data)

    function saveOperation() {

        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.withCredentials = true;

        axios(
            {
                method: 'POST',
                url: props.endpoint,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + props.token,
                  },
                data: data,
                }
            )

            setDisplaySerial(false)
            setDisplayTask(false)
            setDisplayComment(false)
            setDisplaySaveButton(false)
            setSelectedProject('')
    }

    function handleProjectChange(e) {

        e.preventDefault()
        setSelectedProject(e.target.value)
        setDisplaySerial(true)
        props.setSearchOutputDisplay(false)
      }

    const handleTaskChange = (event) =>{
        event.preventDefault()
        setDisplayComment(true)
        setCompletion(event.target.value)
    }

    const handleSerialChange = (event) =>{
        event.preventDefault()
        setDisplayTask(true)
        setSerialNumber(event.target.value)
    }

    const handleCommentsChange = (event) =>{
        event.preventDefault()
        setDisplaySaveButton(true)
        setComment(event.target.value)
    }

    const componentStyle = {
        maxWidth: '250px',
        minWidth: '150px',
      };

    const serialNumberElement = <div className="some-space"><TextField id="outlined-basic" label="Serial Number" variant="outlined" onChange={handleSerialChange} /></div>

    const taskElement = <div className="some-space"><FormControl style={componentStyle}>
    <InputLabel id="demo-simple-select-label">Task</InputLabel>
    <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={completion}
        label="Task"
        onChange={handleTaskChange}
    >
        <MenuItem value="Whole Part">Whole Part</MenuItem>
        <MenuItem value="Inner">Inner</MenuItem>
        <MenuItem value="Outer">Outer</MenuItem>
        <MenuItem value="Welding">Welding</MenuItem>
        <MenuItem value="Weld dressing">Weld Dressing</MenuItem>
    </Select>
    </FormControl></div>

    const commentElement = <div className="some-space"><TextField id="outlined-basic" label="Comments" variant="outlined" onChange={handleCommentsChange} /></div>

    const saveButton = <div><div className="some-space"><Button variant="contained" onClick={saveOperation}>Save</Button></div></div>

    return (

        <Card>
            <h4>Record</h4>
        <div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Select Project</InputLabel>
            <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={selectedProject}
            onChange={handleProjectChange}
            label="Project"
            >
            <MenuItem value="">
                <em>None</em>
            </MenuItem>
            {props.projects.map((option, index) =>(
            <MenuItem value={option.id} key={index}>{option.fg_code + ':  ' + props.customers[option.customer -1]?.name + ' ' + option.name}</MenuItem>))}
            </Select>
        </FormControl>
        </div>    

        {displaySerial? serialNumberElement: noDisplay}
        {displayTask? taskElement: noDisplay}
        {displayComment? commentElement: noDisplay}
        {displaySaveButton? saveButton: noDisplay}
        </Card>)


}

export default Wip
