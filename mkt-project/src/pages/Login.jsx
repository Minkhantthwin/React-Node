import {Alert, Box, Button, TextField, Typography, Link} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useApp } from '../ThemedApp';
import { loginUser } from '../libs/fetcher';
import { useMutation } from '@tanstack/react-query';
import { useRef, useState} from 'react';

export default function Login() {

    const usernameInput = useRef();
    const passwordInput = useRef();

    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { setAuth, setGlobalMsg } = useApp();

    const handleSubmit = () => {
        const username = usernameInput.current.value;
        const password = passwordInput.current.value;

        if (!username || !password) {
            setError('All fields are required');
            return false;
        }
        login.mutate({ username, password });
    };
    
    const login = useMutation({
        mutationFn: loginUser,
        onMutate: () => {
            setGlobalMsg('Logging in...');
        },
        onSuccess: async result => {  
            setAuth(result.user);
            localStorage.setItem("token", result.token);
            navigate('/');
            setGlobalMsg('Logged in');
        },
        onError: (error) => {
            setError(error.message);
            setGlobalMsg(null);
        },
    });

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 2 }}>Login</Typography>
            {error && <Alert severity='error' sx={{mb: 2}}>{error}</Alert>}

            <form onSubmit={e => {
                e.preventDefault();
                handleSubmit();
            }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        mt: 2,
                    }}
                >
                    <TextField inputRef={usernameInput} placeholder='Username' fullWidth/>
                    <TextField inputRef={passwordInput} type='password' placeholder='Password' fullWidth/>
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