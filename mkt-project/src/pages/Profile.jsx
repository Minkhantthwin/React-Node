import { Avatar, Box, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";

import Item from "../components/Item";

import { formatRelative } from 'date-fns';

export default function Profile() {
    return (
        <Box>
            <Box sx={{bgcolor:"banner", height: 150, borderRadius: 4}}></Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    mt: -6,
                    mb: 2
                }}>
                <Avatar sx={{width: 100, height: 100, bgcolor: pink[500]}} /> 
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Me</Typography>
                    <Typography>
                        My Profile bio content are here. I can write about myself.
                    </Typography>

                </Box>
            </Box>
            <Item key={1} remove={()=>{}} item={{
                id: 1,
                name: 'Me',
                content: 'This is my first post',
            }}/>
        </Box>
    );
 }