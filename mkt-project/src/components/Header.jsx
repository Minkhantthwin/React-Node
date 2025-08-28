import { useApp } from '../ThemedApp';

import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';

import {
    Menu as MenuIcon,
    Add as AddIcon,
    LightMode as LightModeIcon,
    DarkMode as DarkModeIcon,
} from '@mui/icons-material';

export default function Header() {
    const { showForm, setShowForm, mode, setMode } = useApp();

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}                    
                >
                    <MenuIcon />
                </IconButton>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    MKT
                </Typography>
                <Box>
                    <IconButton
                        color="inherit"
                        onClick={() => setShowForm(!showForm)}
                    >
                        <AddIcon/>
                    </IconButton>
                    {mode === 'dark' ? (
                        <IconButton
                        color="inherit"
                        edge="end"
                        onClick={() => setMode('light')}>
                        <LightModeIcon/>
                    </IconButton>) : (
                        <IconButton
                        color="inherit"
                        edge="end"
                        onClick={() => setMode('dark')}>
                        <DarkModeIcon/>
                    </IconButton>
                )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}