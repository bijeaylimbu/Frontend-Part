import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid } from "@material-ui/core";
import { useEffect, useState } from 'react';
import taxService from '../services/tax.service';
import { Link, useLocation } from 'react-router-dom';
import { Box, Button } from '@mui/material';
export default function DeductingItems() {
    const location = useLocation();
    const [deductingItem, setDeductingItem] = useState([]);
    const personId = location.state?.id;
    useEffect(() => {
        taxService.getAllDeductingItem(personId).then(res => setDeductingItem(res.data));
    }, [personId])
    const deleteReductingItemById= async(id)=>{
        taxService.deleteReductingItem(id);
        window.location.reload();
    }
    return (
        <>
            <Grid item xs={5}>
            <Box component="div" sx={{ display: 'inline', marginLeft:'30px', paddingTop:'150px' }}>Deducting Items</Box>
                <Table sx={{ maxWidth: 350 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Item Name</TableCell>
                            <TableCell align="right">Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {deductingItem.map((data) => {
                            return (
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="right">{data.item_name}</TableCell>
                                    <TableCell align="right">{data.amount}</TableCell>
                                    <TableCell align="right" sx={{ minWidth: 100 }}>
                                        <Link
                                            to="/update"
                                            state={{ id: data.id, itemName: data.item_name, amount: data.amount, type:"deducting" }}
                                            style={{ textDecoration: 'none' }}
                                        >Edit</Link>
                                        <Button onClick={()=>deleteReductingItemById(data.id)}> Delete</Button>
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