import {Alert, Box, Button, TextField, Typography, Link} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useApp } from '../ThemedApp';

export default function Login() {
    const navigate = useNavigate();
    const { setAuth, setGlobalMsg } = useApp();

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 2 }}>Login</Typography>
            <Alert severity="warning" sx={{ mb: 2 }}>
                All fields are required.
            </Alert>

            <form onSubmit={e => {
                e.preventDefault();
                setAuth(true);
                setGlobalMsg('Logged in');
                navigate('/');
            }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        mt: 2,
                    }}
                >
                    <TextField placeholder='Username' fullWidth/>
                    <TextField type='password' placeholder='Password' fullWidth/>
                    <Button type='submit' variant='contained' fullWidth>
                        Login
                    </Button>
                    <Typography sx={{ textAlign: 'center', mt: 1 }}>
                        No account?{' '}
                        <Link href='/register' underline='hover'>
                            Register
                        </Link>
                    </Typography>
                </Box>
            </form>
        </Box>
    );
}