import React, { useEffect, useState } from "react";
import DatePicker from './DatePicker'
import axios from "axios";
import { Button, TextField, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@mui/material'
import Card from './Card'
import apiEndpoints from "../ApiEndpoints";


function Records(props) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const formattedDate = String(selectedDate.toISOString().slice(0, 10))

  const [serialNumber, setSerialNumber] = useState('')
  const [partInstances, setPartInstances] = useState([])

  const [toggleDateSerial, setsearchCriteria] = useState(true)

  const [showDelCollResults, setShowDelCollResults] = useState(true)
  const [showSerialResults, setShowSerialResults] = useState(false)

  const [deliveries, setNewDeliveries] = useState([])
  const [collections, setNewCollections] = useState([])

  const noDisplay = <div></div>


  function getData(url, f) {
    
    axios(
        {
        method: 'GET',
        url: url,
        headers:{
          'Authorization': 'Token ' + props.token
        }
        }
    ).then(response => {
        const filteredData = response.data.filter(item => String(item.date) === formattedDate)
        f(filteredData)
    }).catch((error) => {
        if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
        }
    });
    
};

function getParts(url, f) {
    
  axios(
      {
      method: 'GET',
      url: url,
      headers:{
        'Authorization': 'Token ' + props.token
      }
      }
  ).then(response => {
      const filteredData = response.data.filter(item => String(item.serial_number) === serialNumber)
      console.log("tutaj")
      f(filteredData)
      
  }).catch((error) => {
      if (error.response) {
      console.log(error.response);
      console.log(error.response.status);
      console.log(error.response.headers);
      }
  });
  
};

const handleClick = () => {
    getData(apiEndpoints.apiDelivery, setNewDeliveries)
    getData(apiEndpoints.apiCollection, setNewCollections)
    setShowDelCollResults(true)
}

const selectSearchCriteria = <Card>
    <FormControl>
    <FormLabel id="demo-radio-buttons-group-label">Search</FormLabel>
        <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="date"
        name="radio-buttons-group"
        onChange={()=>{setsearchCriteria(!toggleDateSerial); setShowDelCollResults(!showDelCollResults)}}
        >
        <FormControlLabel value="date" control={<Radio />} label="Deliveries and Collections by date" />
        <FormControlLabel value="serial" control={<Radio />} label="Parts by serial Number" />
        </RadioGroup>
    </FormControl>
</Card>

const lookByDate = <Card>
        <h3> Look for past Deliveries and Collections</h3>
        <div>
        <div className="some-space"> <DatePicker setValue={setSelectedDate}/></div>
        <div className="some-space"><button onClick={handleClick}>Search</button></div>
        </div>
    </Card>

const lookBySerial = <Card>
        <h3> Look for parts by serial number</h3>
        <div>
        <TextField id="outlined-basic" label="Serial Number" variant="outlined" value={serialNumber} onChange={(e)=>{setSerialNumber(e.target.value)}} />

        <div className="some-space"><button onClick={()=>{getParts(apiEndpoints.apiPartInstance, setPartInstances); setShowSerialResults(true)}}>Search</button></div>
        </div>
    </Card>
const deliveriesCollectionsResults = <div>
        <Card>
            <h3>Deliveries</h3>
            <div className="container">
            <table>
            {deliveries.map((item, index) => (
                <tbody key={index}>
                    
                    <tr>
                        <td className="left">{props.projects[item.project -1]?.name}     </td>
                        <td className="right">{item.qty}</td>
                    </tr>
                    
                </tbody>
                ))}
            </table>
            </div>
        </Card>

        <Card>
        <h3>Collections</h3>
        <div className="container">
        <table>
        {collections.map((item, index) => (
            <tbody key={index}>
                
                <tr>
                    <td className="left">{props.projects[item.project -1]?.name}     </td>
                    <td className="right">{item.qty}</td>
                </tr>
                
            </tbody>
            ))}
        </table>
        </div>
        </Card>

    </div>

    console.log("collections", collections)

const partInstanceResults = <Card>
        <h3>Parts</h3>
        <div className="container">
          <table>
          {partInstances.map((item, index) => (
              <tbody key={index}>
                <th>Part</th>
                <th>Number</th>
                <th>Despatched</th>
                  
                  <tr>
                      <td className="left">{props.projects[item.project -1]?.name}     </td>
                      <td className="right">{item.serial_number}</td>
                      <td className="left">{props.collections[item.collection -1]?.date}     </td>
                  </tr>
              </tbody>
              ))}
          </table>
        </div>
    </Card>




console.log("collections", collections)

return (<div>

    {selectSearchCriteria}
    {toggleDateSerial? lookByDate: lookBySerial}
    
    {showDelCollResults? deliveriesCollectionsResults: noDisplay} 
    {showSerialResults? partInstanceResults: noDisplay}

</div>);
}

export default Records