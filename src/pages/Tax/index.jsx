import PayableItems from "../../components/payableItems";
import { Grid } from "@material-ui/core";
import DeductingItems from "../../components/deductingItems";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import taxService from "../../services/tax.service";
export default function TaxPage() {
    const location = useLocation();
    console.log(window.sessionStorage.getItem("personId"));
    const [personName, setPersonName] = useState( location.state.personName  ? location.state.personName : window.sessionStorage.getItem("personId"));
    const [personId, setPersonId] = useState( location.state.id  ? location.state.id : window.sessionStorage.getItem("personName"));
    const [payableItemName, setPayableItemName] = useState();
    const [deductingItemName, setDeductingItemName] = useState();
    const [payableAmount, setPayableAmount] = useState();
    const [deductingAmount, setDeductingAmount] = useState();
    const [updateable, setUpdateable] = useState(false);
    window.sessionStorage.setItem("personId",location.state.id);
    window.sessionStorage.setItem("personName",location.state.personName);
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
            {
                updateable === false ?
                    <>
                        <Box component="div" marginTop={30} marginLeft={20} sx={{ textOverflow: 'clip' }}>Welcome  {personName}</Box>
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
                    :
                    <>
                    </>
            }

        </>
    );
}