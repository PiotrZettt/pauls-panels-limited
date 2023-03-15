import React, { useEffect, useState } from "react";
import axios from "axios";
import apiEndpoints from "../ApiEndpoints"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from './Card'
import AddNumbers from "./AddNumbers";
import { TextField, Button } from "@mui/material";
import ReactDatePicker from "react-datepicker";


function StockMove(props){

    const [selectedProject, setSelectedProject] = useState('')
    const [qty, setQuantity] = useState('')

    const [stockDirection, setStockDirection] = useState("")
    const [saveConfirmation, setSaveConfirmation] = useState(false)
    const [showQtyInput, setShowQtyInput] = useState(false)
    const [showAddSerials, setShowAddSerials] = useState(false)
    const [showSaveButton, setShowSaveButton] = useState(false)
    const [showAddSerialsButton, setShowAddSerialsButton] = useState(false)
    const [collection, setCollection] = useState(null)
    const [projectName, setProjectName] = useState('')

    const [serialNumbers, setSerialNumbers] = useState([])


    const noDisplay = <div></div>

    useEffect(()=>{
      stockMovementDirection();
    }, [props.substract]);
    

    function save() {

        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
        axios.defaults.withCredentials = true;

        const data = {"project": selectedProject, "qty": parseInt(qty)}
        const newStock = props.projects[selectedProject -1].stock + (parseInt(qty) * props.substract)

        console.log("data: ", data, "old stock: ", props.projects.find(obj => obj.id === selectedProject).stock,  "new stock: ", newStock)

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
            ).then((response) => {
              const data = response.data;
              setCollection(data.id)
          }).catch((error) => {
              if (error.response) {
              console.log(error.response);
              console.log(error.response.status);
              console.log(error.response.headers);
              }
          });
            
        axios.patch(apiEndpoints.apiProject + selectedProject + '/', { "stock": newStock }, {headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + props.token,
        }},); 
        
        setShowQtyInput(false)
        setShowSaveButton(false)
        setSaveConfirmation(false)
        setShowAddSerialsButton(true)

        console.log(data)
              }

    

    function handleChange(e) {

            e.preventDefault()
            setSelectedProject(e.target.value)
            setShowQtyInput(true)
            setShowAddSerialsButton(false)
            setProjectName(props.projects[selectedProject -1].name)
            
            console.log(" name:",  name)
            
          }

    function stockMovementDirection() {
      if (props.substract === 1) {
        setStockDirection('delivery')
      }else{
        setStockDirection('collection')
      }
    }

    const qtyInput = <div>
        <TextField id="outlined-basic" label="Quantity" variant="outlined" value={qty} onChange={(e)=>{setQuantity(e.target.value); setShowSaveButton(true); setSaveConfirmation(true);
        }} />
      </div>

    const saveButton = <div><Button variant="contained" onClick={()=>{save()}}>Save</Button></div>

    const addSerialsButton = <div><Button variant="contained" onClick={()=>setShowAddSerials(true)}>Add Serial Numbers</Button></div>

    const showSaveConfirmation = <div><h3 className="warning">Save a {stockDirection} of {props.projects[selectedProject - 1]?.name} x {qty}pcs?</h3></div>

    const addSerials = <AddNumbers
      project={selectedProject}
      collection={collection}
    />
 
    return (<div>

        <Card>

          <div className="some-space">Record a new {stockDirection}</div>

          <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Select Project</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={selectedProject}
                  onChange={handleChange}
                  label="Project"
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                      {props.projects.map((option, index) =>(
                    <MenuItem value={option.id} key={index}>{option.fg_code + ':  ' + props.customers[option.customer -1]?.name + ' ' + option.name}</MenuItem>))}
                </Select>
            </FormControl>
          </div>
      
          {showQtyInput? qtyInput: noDisplay}

          <br/> 

          <div>
              {saveConfirmation? showSaveConfirmation: noDisplay}
          </div>
          <div>
            {showSaveButton? saveButton: noDisplay}
            </div>
            <div>
            {showAddSerialsButton? addSerialsButton: noDisplay}
          </div>
          <div>
            {showAddSerials? addSerials: noDisplay}
          </div>
        </Card>
     </div>)
}  

export default StockMove