import  jwtDecode  from "jwt-decode";
import { createContext, useContext, useState, useEffect } from "react";

const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    isAuthenticated: false,
    role: null,
    token: null,
    fullname: null,
    email: null
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decoded = decodeToken(token);
      console.log(decoded);

      if (decoded) {
        const now = Math.floor(Date.now() / 1000);
        if (!decoded.exp || decoded.exp > now) {
          setUser({
            isAuthenticated: true,
            role: decoded.role, 
            token,
            fullname: decoded.fullname,
            email: decoded.email,
          });
        } else {
          localStorage.removeItem("authToken");
        }
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser({
      isAuthenticated: false,
      role: null,
      token: null,
      fullname: null,
      email: null
    });
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
