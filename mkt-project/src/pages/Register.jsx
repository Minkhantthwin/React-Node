import {Box, Button, TextField, Typography, Alert, Link} from '@mui/material';

import { useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { postUser } from '../libs/fetcher';
import { useMutation } from '@tanstack/react-query';    
import { useApp } from '../ThemedApp';

export default function Register() {

    const navigate = useNavigate();

    const nameInput = useRef();
    const usernameInput = useRef();
    const bioInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();

    const [error, setError] = useState(null);
    const { setGlobalMsg } = useApp();

    const handleSubmit = () => {
        const name = nameInput.current.value;
        const username = usernameInput.current.value;
        const bio = bioInput.current.value;
        const email = emailInput.current.value;
        const password = passwordInput.current.value;
        
        if (!name || !username || !password || !email) {
            setError('All fields are required');
            return false;
        }
        create.mutate({ name, username, email, password, bio });
    };

    const create = useMutation({
        mutationFn: postUser,
        onMutate: () => {
            setGlobalMsg('Creating account...');
        },
        onSuccess: () => {
            setGlobalMsg('Account created');
            navigate('/login');
        },
        onError: (error) => {
            setError(error.message);
            setGlobalMsg(null);
        },
    });

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 2 }}>Register</Typography>
            <Alert severity='warning' sx={{mb: 2}}>All fields required</Alert>
            <form onSubmit={e => {
                e.preventDefault();
                setGlobalMsg('Registered');
                handleSubmit();
            }}>
             <Box sx={{display: 'flex', flexDirection: 'column', gap: 1, mt: 2}}>
                <TextField inputRef={nameInput} placeholder='Name' fullWidth/>
                <TextField inputRef={usernameInput} placeholder='Username' fullWidth/>
                <TextField inputRef={bioInput} placeholder='Bio' fullWidth/>
                <TextField inputRef={emailInput} type='email' placeholder='Email' fullWidth/>
                <TextField inputRef={passwordInput} type='password' placeholder='Password' fullWidth/>
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