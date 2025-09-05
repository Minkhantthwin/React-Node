import { Alert, Avatar, Box, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";

import Item from "../components/Item";

import { useParams } from "react-router-dom";
import { fetchUser } from "../libs/fetcher";
import { useQuery } from "@tanstack/react-query";

export default function Profile() {
    const { id } = useParams();

    const { data, isLoading, isError, error} = useQuery(
        {
        queryKey: ['user', id],
        queryFn: () => fetchUser(id),
    });
    if (isError) {
        return <Alert severity="error">{error.message}</Alert>;
    }
    if (isLoading) {
        return <Alert severity="info">Loading...</Alert>;
    }
    if (!data) {
        return <Alert severity="error">User not found</Alert>;
    }    

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
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{data.name}</Typography>
                    <Typography>
                        {data.bio ? data.bio : 'No bio yet' }
                    </Typography>

                </Box>
            </Box>

        </Box>
    );
 }