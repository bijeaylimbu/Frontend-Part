import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import taxService from '../../services/tax.service';

export default function PersonName() {
    const [nameData, setNameData] = useState([]);
    useEffect(() => {
        taxService.getAllPersonName().then(res => setNameData(res.data));
    }, [])
    return (
        <>
            <Box
                sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper', marginLeft: 30, marginTop: 30 }}
            >
                {nameData.map(data => (
                    <ListItem component="div" disablePadding>
                        <Link to="/tax" state={{ id: data.id, personName: data.name }}>
                            {data.name}
                        </Link>
                    </ListItem>
                ))}
            </Box>
        </>
    );
}