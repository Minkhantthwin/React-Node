import { useApp } from '../ThemedApp';

import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';

import {
    Menu as MenuIcon,
    Add as AddIcon,
    LightMode as LightModeIcon,
} from '@mui/icons-material';

export default function Header() {
    const { showForm, setShowForm } = useApp();

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

                    <IconButton
                        color="inherit"
                        edge="end">
                        <LightModeIcon/>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}