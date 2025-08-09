import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setIsLoggedIn(response.data.isAuthenticated);
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      } finally {
        setAuthLoading(false); 
      }
    };
   
    checkLoginStatus();
  },[isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, authLoading, user, setIsLoggedIn, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
