import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { BeatLoader } from "react-spinners";
import { useState } from "react";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Logout({ onLogout }) {
  const { setIsLoggedIn, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      setLoading(true);
      await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/logout`,
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      setUser(null);
      setLoading(false);
      if (onLogout) onLogout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-primary transition-colors disabled:opacity-50 px-3 py-1.5 rounded-full hover:bg-white/5 w-full md:w-auto justify-start md:justify-center"
    >
      {loading ? (
        <BeatLoader size={8} color="#dc2626" />
      ) : (
        <>
          <MdLogout size={18} />
          <span>Logout</span>
        </>
      )}
    </button>
  );
}
