import { Grid } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import taxService from '../../services/tax.service';
export default function TaxSlabPage() {
    const location = useLocation();
    const personId = location.state.personId;
    const personName = location.state.personName;
    const [totalPayableItem, setTotalPayableItem] = useState();
    const [totalReductingItem, setTotalReductingItem] = useState();
    useEffect(() => {
        taxService.getAllPayableItem(personId)
            .then((result) => {
                const totalPayableItem = (result.data.map((item) => item.amount));
                for (var i = 0; i <= totalPayableItem.length; i++) {
                    setTotalPayableItem(totalPayableItem.reduce((a, b) => parseInt(a) + parseInt(b)))
                }
            }
            );
        taxService.getAllDeductingItem(personId)
            .then((result) => {
                const totalReductingItem = (result.data.map((item) => item.amount));
                for (var i = 0; i <= totalReductingItem.length; i++) {
                    setTotalReductingItem(totalReductingItem.reduce((a, b) => parseInt(a) + parseInt(b)))
                }
            }
            );
    }, [personId])
    const TotalPayable = (amount) => {
        let remainingAmount = amount;
        let totalNetPaybleAmount = 0;
        if (amount >= 0 && (amount - 1000) >= 0) {
            const taxSlabAt5 = 1000 * (5 / 100);
            remainingAmount -= 1000;
            totalNetPaybleAmount += taxSlabAt5;
            if (remainingAmount >= 0 && (remainingAmount - 4000) > 0) {
                const taxSlabAt15 = 3000 * (15 / 100);
                remainingAmount -= 3000;
                totalNetPaybleAmount += taxSlabAt15;
                if (remainingAmount > 0) {
                    const taxSlabAt30 = remainingAmount * (30 / 100);
                    remainingAmount -= taxSlabAt30;
                    totalNetPaybleAmount += taxSlabAt30;
                }
            }
            else if (remainingAmount >= 0 && (4000 - remainingAmount) > 0) {
                const taxSlabAt15 = (4000 - remainingAmount) * (15 / 100);
                remainingAmount -= remainingAmount;
                totalNetPaybleAmount += taxSlabAt15;
            }
        }
        return totalNetPaybleAmount;
    }
    return (
        <>
            <Grid item xs={5}>
                <Table sx={{ maxWidth: 350, marginLeft: 10, marginTop: 10 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right" sx={{ minWidth: 100 }}>Total Payable</TableCell>
                            <TableCell align="right" sx={{ minWidth: 100 }}>Total Deducting</TableCell>
                            <TableCell align="right" sx={{ minWidth: 100 }}>Total Tax</TableCell>
                            <TableCell align="right" sx={{ minWidth: 100 }}>Net Payable</TableCell>
                            <TableCell align="right" sx={{ minWidth: 100 }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="right">{personName} </TableCell>
                            <TableCell align="right"> {totalPayableItem}</TableCell>
                            <TableCell align="right" >{totalReductingItem}</TableCell>
                            <TableCell align="right" >{TotalPayable(totalPayableItem - totalReductingItem)}</TableCell>
                            <TableCell align="right" > {totalPayableItem - totalReductingItem - TotalPayable(totalPayableItem)}</TableCell>
                            <TableCell align="right" >
                                <Link
                                    to="/tax"
                                    state={{ id: personId, personName: personName }}
                                    style={{ textDecoration: 'none' }}
                                >Edit</Link>
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </Grid>
        </>
    );
}