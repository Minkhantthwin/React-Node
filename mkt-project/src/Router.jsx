import {
  createBrowserRouter,
} from "react-router-dom";

import Template from "./Template";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Comment from "./pages/Comment";
import Likes from "./pages/Likes";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Template />,
        children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "/login",
              element: <Login />,
            },
            {
              path: "/register",
              element: <Register />,
            },
            {
              path: "/profile/:id",
              element: <Profile />,
            },
            {
              path: "/comment/:id",
              element: <Comment />,
            },
            {
              path: "/likes/:id",
              element: <Likes />,
            },
        ]
    }
]);

export default router;