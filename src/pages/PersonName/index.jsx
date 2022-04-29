import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import taxService from '../../services/tax.service';
import List from '@mui/material/List';
import { ListItemText } from '@mui/material';


export default function PersonName() {
    const [nameData, setNameData] = useState([]);
    useEffect(() => {
        taxService.getAllPersonName().then(res => setNameData(res.data));
    }, [])
    return (
        <>
            <Box
                sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper', marginLeft: 30, marginTop: 30 }}
            >Name of the Person
                {nameData.map(data => (
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <ListItem alignItems="flex-start">
                            <Link
                                to="/tax"
                                state={{ id: data.id, personName: data.name }}
                                style={{ textDecoration: 'none' }}
                            >
                                <ListItemText primary={data.name} />
                            </Link>
                        </ListItem>
                    </List>
                ))}
            </Box>
        </>
    );
}