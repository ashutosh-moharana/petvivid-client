import axios from 'axios';
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const {setUser , setIsLoggedIn} = useAuth();
    const navigate = useNavigate();
    const handleLogout = async () =>{
     await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
          withCredentials: true,
        });
    setUser({}); 
    setIsLoggedIn(false);
    navigate("/");
    }
  return (
    <button className="btn btn-primary" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
