import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import { ButtonGroup } from "@mui/material";
import Stock from "./logisticsComponents/Stock";
import StockMove from "./logisticsComponents/StockMove"
import StockTake from "./logisticsComponents/StockTake";
import Records from './logisticsComponents/Records'
import apiEndpoints from "./ApiEndpoints";
import Date from "./logisticsComponents/Date";



function Logistics(props){

    const [displayCurrentStock, setDisplayCurrentStock] = useState(false)
    const [displayStockMove, setDisplayStockMove] = useState(false)
    const [displayStockTake, setDisplayStockTake] =useState(false)
    const [displayRecords, setDisplayRecords] = useState(false)
    const [displayLogisticsInfo, setDisplayLogisticsInfo] = useState(true)

    const [subtractQuantity, setSubstractQuantity] = useState(1)
    const [endpoint, setEndpoint] = useState('')

    const projectUrl = 'api/Project?orderBy=id/'
    const customerUrl = 'api/Customer?orderBy=id/'
    const collectionUrl = 'api/Collection?orderBy=id/'

    const token = props.token

    const [customers, setNewCurrentCustomers] = useState([])
    const [projects, setNewCurrentProjects] = useState([])
    const [collections, setNewCollections] = useState([])

    const [refresh, setRefresh] = useState(true)

    const logisticsInfo = <div className="align-left">
        <div>In here you can:<ul> <li><h5>check current stock numbers</h5></li><li><h3>record a delivery or collection</h3></li><li><h4>do a stock take</h4></li><li><h5>search for records of previous deliveries and collections by date</h5></li>.</ul></div>
        </div>

    const noDisplay = <div></div>

    useEffect(()=>{
        getData(projectUrl, setNewCurrentProjects);
        getData(customerUrl, setNewCurrentCustomers);
        getData(collectionUrl, setNewCollections);
        checkStockCorrect();
    }, [refresh]);

    function getData(url, f) {
        
        axios(
            {
            method: 'GET',
            url: url,
            headers:{
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

    function checkStockCorrect(){
        for (let i = 0; i < projects.length; i++){
            if (i.stock < 0) {
                window.alert("The stock quantity is not correct!!!")
            }
        }

    }

    return <div>
            <h2>Logistics it is</h2>
            {displayLogisticsInfo? logisticsInfo: noDisplay}
            
            
        <div className="button-group">
        <ButtonGroup variant="outlined" aria-label="large outlined button group">
            <Button variant="outlined" onClick={()=>{
                setDisplayCurrentStock(true); 
                setDisplayStockMove(false);
                setDisplayStockTake(false);
                setDisplayLogisticsInfo(false)
                setDisplayRecords(false)
                setRefresh(!refresh)
                }}>Current Stock</Button>
            <Button variant="outlined" onClick={()=>{
                setDisplayCurrentStock(false);
                setDisplayStockMove(false)
                setDisplayStockTake(true)
                setDisplayLogisticsInfo(false)
                setDisplayRecords(false)
                 }}>Stocktake</Button> 
        </ButtonGroup>
        </div>

        <div className="button-group">
        <ButtonGroup variant="outlined" aria-label="large outlined button group">
            <Button variant="outlined" onClick={()=>{
                setDisplayCurrentStock(false); 
                setDisplayStockMove(true)
                setDisplayLogisticsInfo(false)
                setDisplayRecords(false)
                setDisplayStockTake(false)
                setSubstractQuantity(1)
                setEndpoint(apiEndpoints.apiDelivery) 
                }}>New Delivery</Button>
            <Button variant="outlined" onClick={()=>{
                setDisplayCurrentStock(false); 
                setDisplayStockMove(true)
                setDisplayLogisticsInfo(false)
                setDisplayRecords(false)
                setDisplayStockTake(false)
                setSubstractQuantity(-1)
                setEndpoint(apiEndpoints.apiCollection)
                }}>New Collection</Button>
            <Button variant="outlined" onClick={()=>{
                setDisplayCurrentStock(false); 
                setDisplayStockMove(false)
                setDisplayStockTake(false)
                setDisplayRecords(true)
                setDisplayLogisticsInfo(false)
                setSubstractQuantity(-1)
                setEndpoint(apiEndpoints.apiCollection)
                }}>Records</Button>
        </ButtonGroup>
        </div>

    <div>
        {displayCurrentStock? <Stock customers={customers} projects={projects}/>: noDisplay}
        {displayStockMove? <StockMove token={token} customers={customers} projects={projects} substract={subtractQuantity} endpoint={endpoint}/>: noDisplay}
        {displayStockTake? <StockTake token={token} projects={projects}></StockTake>: noDisplay}
        {displayRecords? <Records token={token} projects={projects} collections={collections}/>: noDisplay}
    </div>

    </div>

}

export default Logistics
