import {
 Box,
 Drawer,
 Divider,
 List,
 ListItem,
 ListItemButton,
 ListItemIcon,
 ListItemText,
 Avatar,
 Typography, 
} from '@mui/material';

import {
    Home as HomeIcon,
    Person as PersonIcon,
    Logout as LogoutIcon,
    PersonAdd as PersonAddIcon,
    Login as LoginIcon,
} from '@mui/icons-material';

import { deepPurple } from '@mui/material/colors';

import { useApp } from '../ThemedApp';

export default function AppDrawer() {
    const {showDrawer, setShowDrawer, auth, setAuth} = useApp();

    return (
        <div>
            <Drawer>
                <Box>
                    <Box>
                        <Avatar sx={{
                            width: 94, height: 94,
                            color: '#fff',
                            bgcolor: deepPurple[500] 
                            }}/>
                        <Typography variant='h6'>Me</Typography>
                    </Box>
                </Box>
            </Drawer>
        </div>
    );

}