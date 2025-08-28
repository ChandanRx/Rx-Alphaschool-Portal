import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Home from "./components/Home";
import Gallery from "./components/Gallery";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Teams from "./components/Teams";
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthWrapper from "./components/AuthWrapper"; 
import Events from "./components/Events";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "signin", element: <AuthWrapper><SignIn /></AuthWrapper> },
      { path: "signup", element: <AuthWrapper><SignUp /></AuthWrapper> },
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "events", element: <ProtectedRoute><Events /></ProtectedRoute> },
      { path: "teams", element: <ProtectedRoute><Teams /></ProtectedRoute> },
      { path: "register", element: <ProtectedRoute><Register /></ProtectedRoute> },
      { path: "gallery", element: <ProtectedRoute><Gallery /></ProtectedRoute> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute roles={["admin"]}>
            <Dashboard />
          </ProtectedRoute>

        )
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute roles={["student"]}>
            <Profile />
          </ProtectedRoute>
        )
      },
    ],
  },
]);

export default router;
