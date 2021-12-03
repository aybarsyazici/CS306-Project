import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect, useMemo } from 'react';
import { User } from './types/user';
import { Api } from './environment';
import './styles/invoices.scss'
import { Game } from './types/game';
import { Alert, TextField } from '@mui/material';
import { Button } from '@material-ui/core';
import { CheckCircleOutline } from '@mui/icons-material';
import { InvoiceType } from './types/invoice';
import { useLocation } from 'react-router-dom';

export function Invoices() {

    const [invoicesArray, setInvoiceArray] = useState<InvoiceType[]>([]);

    const { search } = useLocation(); 

    const params = useMemo(() => new URLSearchParams(search), [search]);

    useEffect(() => {
        const userId = params.get('userId');
        Api.get('/getInvoices?userId='+userId).then((e)=>{
            setInvoiceArray(e.data.data);
        });
    }, [])

    useEffect(() => {
        console.log(invoicesArray);
    }, [invoicesArray])

    return (
        <div className="invoices">
            <Alert severity="info">Click on Invoice to see the games</Alert>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Invoice Id</TableCell>
                    <TableCell align="right">User Id</TableCell>
                    <TableCell align="right">Total Cost</TableCell>
                    <TableCell align="right">Invoice Date</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {invoicesArray ? (invoicesArray.map((invoice) => (
                    <TableRow
                    key={invoice.invoiceId}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {invoice.invoiceId}
                    </TableCell>
                    <TableCell align="right">{invoice.userId}</TableCell>
                    <TableCell align="right">{invoice.totalCost}</TableCell>
                    <TableCell align="right">{invoice.invoiceDate.toString().substring(0,10)}</TableCell>
                    </TableRow>
                ))) : null}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    );
}
  
export default Invoices;
  