import axios from 'axios';
import { useState } from 'react';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
const Logout = () => {
    const {setUser , setIsLoggedIn} = useAuth();
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const handleLogout = async () =>{
      setLoading(true);
     await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
          withCredentials: true,
        });
    setUser({}); 
    setIsLoggedIn(false);
    setLoading(false);
    navigate("/");
    }
  return (
    <button className="btn btn-primary" onClick={handleLogout}>
      {loading ? <BeatLoader size={5} color={"white"} />: "Logout" }
    </button>
  );
};

export default Logout;
