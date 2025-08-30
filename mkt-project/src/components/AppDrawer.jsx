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
    Person as ProfileIcon,
    Logout as LogoutIcon,
    PersonAdd as RegisterIcon,
    Login as LoginIcon,
} from '@mui/icons-material';

import { deepPurple } from '@mui/material/colors';

import { useNavigate } from 'react-router-dom';
import { useApp } from '../ThemedApp';

export default function AppDrawer() {
    const {showDrawer, setShowDrawer, auth, setAuth} = useApp();
    const navigate = useNavigate();

    return (
        <div>
            <Drawer open={showDrawer} onClose={() => setShowDrawer(false)}>
                <Box sx={{width: 300, height: 140,bgcolor: 'banner', position: 'relative' }}>
                    <Box sx={{ position: 'absolute', bottom: -25, left: 20, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{
                            width: 94, height: 94,
                            color: '#fff',
                            bgcolor: deepPurple[500] 
                            }}/>
                        <Typography sx={{ fontWeight: "bold"}}>Me</Typography>
                    </Box>
                </Box>
                <List sx={{ pt: 4 }}>
                    <ListItem>
                        <ListItemButton onClick={() => {
                            navigate('/');
                            setShowDrawer(false);
                        }}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText>Home</ListItemText>
                        </ListItemButton>    
                    </ListItem>
                    <Divider />
                    { auth && (
                    <>
                     <ListItem>
                        <ListItemButton onClick={() => {
                            navigate('/profile/1');
                            setShowDrawer(false);
                        }}>
                            <ListItemIcon>
                                <ProfileIcon />
                            </ListItemIcon>
                            <ListItemText>Profile</ListItemText>
                        </ListItemButton>    
                    </ListItem>

                    <ListItem>
                        <ListItemButton onClick={() => setAuth(null)}>
                            <ListItemIcon>
                                <LogoutIcon color='error' />
                            </ListItemIcon>
                            <ListItemText>Logout</ListItemText>
                        </ListItemButton>    
                    </ListItem>
                    </>
                    )}
                    { !auth && (
                    <>
                    <ListItem>
                        <ListItemButton onClick={() => {
                            navigate('/register');
                            setShowDrawer(false);
                        }}>
                            <ListItemIcon>
                                <RegisterIcon/>
                            </ListItemIcon>
                            <ListItemText>Register</ListItemText>
                        </ListItemButton>    
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={()=> {
                            navigate('/login');
                            setShowDrawer(false);
                        }}>
                            <ListItemIcon>
                                <LoginIcon />
                            </ListItemIcon>
                            <ListItemText>Login</ListItemText>
                        </ListItemButton>    
                    </ListItem>
                    </>
                    )}
                </List>
            </Drawer>
        </div>
    );

}