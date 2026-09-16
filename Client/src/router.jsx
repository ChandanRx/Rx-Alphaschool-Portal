import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthWrapper from "./components/AuthWrapper";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Teams from "./pages/Teams";
import Profile from "./pages/Profile";
import Events from "./pages/Events";

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
