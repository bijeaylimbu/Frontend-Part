import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import taxService from "../../services/tax.service";

export default function UpdatePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [updatedItemName, setUpdatedItemName] = useState(location.state.itemName);
    const [updatedAmount, setUpdatedAmount] = useState(location.state.amount);
    const id = location.state.id;
    const itemName = location.state.itemName;
    const amount = location.state.amount;
    const type = location.state.type;
    const updateDeductingItem = () => {
        taxService.updateDeductingItem(id, updatedItemName, updatedAmount);
        navigate("/tax");
    }
    const updatePayableItem = () => {
        taxService.updatePayableItem(id, updatedItemName, updatedAmount);
        navigate("/tax")
    }
    return (
        <>
            <TextField
                id="filled-helperText"
                label="Item Name" // better accessibility with Material UI
                defaultValue={itemName}
                variant="outlined"
                onChange={(e) => setUpdatedItemName(e.target.value)}
                aria-describedby="component-error-text"
                style={{ width: '150px', marginLeft: "10px", marginTop: "20px" }}
            />
            <TextField
                id="filled-helperText"
                label="Amount" // better accessibility with Material UI
                defaultValue={amount}
                variant="outlined"
                onChange={(e) => setUpdatedAmount(e.target.value)}
                aria-describedby="component-error-text"
                style={{ width: '150px', marginLeft: "10px", marginTop: "20px" }}
            />
            <Button
                variant="contained"
                onClick={type === "payable" ? updatePayableItem : updateDeductingItem}
            >
                Update {type}
            </Button>
        </>
    );
}