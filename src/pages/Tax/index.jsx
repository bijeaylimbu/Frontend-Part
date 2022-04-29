import PayableItems from "../../components/payableItems";
import { Grid } from "@material-ui/core";
import DeductingItems from "../../components/deductingItems";
import { Link, useLocation } from "react-router-dom";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import taxService from "../../services/tax.service";
export default function TaxPage() {
    const location = useLocation();
    const personId = location.state.id;
    const personName = location.state.personName;
    const [payableItemName, setPayableItemName] = useState();
    const [deductingItemName, setDeductingItemName] = useState();
    const [payableAmount, setPayableAmount] = useState();
    const [deductingAmount, setDeductingAmount] = useState();
    const addPayableItem = async (e) => {
        e.preventDefault();
        taxService.createPayableItem(personId, payableItemName, payableAmount);
        window.location.reload();
    }
    const addDeductingItem = async (e) => {
        e.preventDefault();
        taxService.createDeductingItem(personId, deductingItemName, deductingAmount);
        window.location.reload();
    }
    return (
        <>
        <Link
                to="/tax-slab"
                state={{ personId: personId, personName: personName }}
                style={{
                    textDecoration: 'none',
                    marginLeft: '40%',
                    marginTop:'30px',
                    border: '1px solid black',
                    padding:'15px 32px',
                    backgroundColor:'#4CAF50',
                    textAlign:"center",
                    display:'inline-block'
                }}
            >
             GoToTaxSlab

            </Link>
            <Box component="div" marginTop={10} marginLeft={20} sx={{ textOverflow: 'clip' }}>Welcome  {personName}</Box>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                    <TextField
                        id="filled-helperText"
                        label="Item Name" // better accessibility with Material UI
                        value={payableItemName}
                        variant="outlined"
                        onChange={(e) => setPayableItemName(e.target.value)}
                        aria-describedby="component-error-text"
                        style={{ width: '150px', marginLeft: "10px", marginTop: "20px" }}
                    />
                    <TextField
                        id="filled-helperText"
                        label="Amount" // better accessibility with Material UI
                        value={payableAmount}
                        variant="outlined"
                        onChange={(e) => setPayableAmount(e.target.value)}
                        aria-describedby="component-error-text"
                        style={{ width: '150px', marginLeft: "10px", marginTop: "20px" }}
                    />
                    <Button
                        variant="contained"
                        onClick={addPayableItem}
                    >
                        Add
                    </Button>
                    <PayableItems />
                </Grid>
                <Grid item xs={5}>
                    <TextField
                        id="filled-helperText"
                        label="Item Name" // better accessibility with Material UI
                        value={deductingItemName}
                        variant="outlined"
                        onChange={(e) => setDeductingItemName(e.target.value)}
                        aria-describedby="component-error-text"
                        style={{ width: '150px', marginLeft: "10px", marginTop: "20px" }}
                    />
                    <TextField
                        id="filled-helperText"
                        label="Amount" // better accessibility with Material UI
                        value={deductingAmount}
                        variant="outlined"
                        onChange={(e) => setDeductingAmount(e.target.value)}
                        aria-describedby="component-error-text"
                        style={{ width: '150px', marginLeft: "10px", marginTop: "20px" }}
                    />
                    <Button
                        variant="contained"
                        onClick={addDeductingItem}
                    >
                        Add
                    </Button>
                    <DeductingItems />
                </Grid>
            </Grid>
        </>
    );
}