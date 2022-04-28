import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid } from "@material-ui/core";
import { useEffect, useState } from 'react';
import taxService from '../services/tax.service';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
export default function PayableItems() {
    const location = useLocation();
    const [payableitem, setPayableItem] = useState([]);
    const personId = location.state?.id;
    useEffect(() => {
        taxService.getAllPayableItem(personId).then(res => setPayableItem(res.data));
    }, [])

    return (
        <>
            <Grid item xs={5}>
                <Table sx={{ maxWidth: 350 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Item Name</TableCell>
                            <TableCell align="right">Amount</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {payableitem.map((data) => {
                            return (
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="right">{data.item_name}</TableCell>
                                    <TableCell align="right">{data.amount}</TableCell>
                                    <TableCell align="right" sx={{ minWidth: 100 }}>
                                        <Link
                                            to="/update"
                                            state={{ id: data.id, itemName: data.item_name, amount: data.amount , type: "payable"}}
                                        >Edit</Link>
                                        <Button> Delete</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Grid>
        </>
    );
}