// filepath: d:\React\React-Node\mkt-project\src\ThemedApp.jsx
import { useState, createContext, useContext, useMemo} from "react";

import {
    CssBaseline,
    ThemeProvider,
    createTheme,
} from '@mui/material';

import {
  RouterProvider,
} from "react-router-dom";

import router from "./router";

import { deepPurple, grey } from "@mui/material/colors";

export const AppContext = createContext();

export function useApp() {
    return useContext(AppContext);
}

export default function ThemedApp() {
    const [showDrawer, setShowDrawer] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [auth, setAuth] = useState(null);
    const [globalMsg, setGlobalMsg] = useState(null);
    const [mode, setMode] = useState('dark');

    const theme = useMemo(() => { return createTheme({
        palette: { 
            mode,
            primary: deepPurple,
            banner: mode === "dark" ? grey[800] : grey[200],
            text:{
                fade: grey[500],
            },
         },
    }); }, [mode]);

    return (
        <ThemeProvider theme={theme}>
        <AppContext.Provider value=
        {{
             showForm, setShowForm, 
             mode, setMode, 
             showDrawer, setShowDrawer,
             auth, setAuth,
             globalMsg, setGlobalMsg
        }}>
        <RouterProvider router={router} />
        <CssBaseline />
        </AppContext.Provider>
        </ThemeProvider>
    );
}