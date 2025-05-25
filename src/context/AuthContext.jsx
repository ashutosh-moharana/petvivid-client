import { createContext, useContext, useState,useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true); // Add loading state
  const [user, setUser] = useState({})

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/check-auth`, {
          withCredentials: true,
        });
        setUser(response.data.user)
        setIsLoggedIn(response.data.isAuthenticated); 
       
        
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      } finally {
        setAuthLoading(false); // Set loading to false after check
      }
    };

    checkLoginStatus();
  }, []);

  const login = async (userData) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, userData , { withCredentials: true });
    if (!res.data.success) {
      throw new Error(res.data.message || "Login failed");
    }
    console.log("Login successful:", res.data);
    
    setUser(res.data.user); // Set user data
    setIsLoggedIn(res.data.success); // Set isLoggedIn to true
  };

  const logout = async () => {
    await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
          withCredentials: true,
        });
    setUser({}); // Clear user data
    setIsLoggedIn(false); // Set isLoggedIn to false
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, authLoading , user}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
