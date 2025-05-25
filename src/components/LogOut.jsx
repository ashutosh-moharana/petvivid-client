import React from "react";

import { useEffect } from "react";
import axios from "axios";

const LogOut = () => {
  useEffect(() => {
    const logout = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/logout`, {
          withCredentials: "true",
        });
        // alert(res.data.message);
       
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };
    logout();
  }, []);

 
};

export default LogOut;
