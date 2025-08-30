import {Box, Button, TextField, Typography, Alert, Link} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useApp } from '../ThemedApp';

export default function Register() {
    const navigate = useNavigate();
    const { setGlobalMsg } = useApp();

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 2 }}>Register</Typography>
            <Alert severity='warning' sx={{mb: 2}}>All fields required</Alert>
            <form onSubmit={e => {
                e.preventDefault();
                setGlobalMsg('Registered');
                navigate('/login');
            }}>
             <Box sx={{display: 'flex', flexDirection: 'column', gap: 1, mt: 2}}>
                <TextField placeholder='Username' fullWidth/>
                <TextField type='email' placeholder='Email' fullWidth/>
                <TextField type='password' placeholder='Password' fullWidth/>
                <TextField type='password' placeholder='Confirm Password' fullWidth/>
                <Button type='submit' variant='contained' fullWidth>Register</Button>
                <Typography sx={{ textAlign: 'center', mt: 1 }}>
                        Have an account ?{' '}
                        <Link href='/login' underline='hover'>
                            Login
                        </Link>
                </Typography>
             </Box>
            </form>
        </Box>    
    );
}