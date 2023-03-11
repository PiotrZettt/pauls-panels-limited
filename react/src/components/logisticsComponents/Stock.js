import React, { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from './Card'

function Stock(props) {

    const projectUrl = 'apiProject/'
    const customerUrl = 'apiCustomer/'

    const [currentProjects, setNewCurrentProjects] = useState([])
    const [currentCustomers, setNewCurrentCustomers] = useState([])

    return <div>
        <Card>

        <h3>Current Stock </h3>

<TableContainer component={Paper}>
    <Table sx={{ maxWidth: 400, margin: 'auto' }} size="small" aria-label="simple table">
        <TableHead>
            <TableRow sx={ {color: 'secondary'} }>
                <TableCell>CUSTOMER</TableCell>
                <TableCell>PROJECT</TableCell>
                <TableCell align="right">QUANTITY</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {props.projects.map((project, index) => (
                <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, color: 'red' }}
                >
                <TableCell component="th" scope="row">{props.customers[project.customer -1].name}</TableCell>
                <TableCell component="th" scope="row">{project.name}</TableCell>
                <TableCell align="right">{project.stock}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
</TableContainer>
        </Card>

    </div>
}

export default Stock