import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function Login() {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      if (!res.data.success) {
        throw new Error(res.data.message || "Login failed");
      }

      setUser(res.data.user);
      setIsLoggedIn(res.data.success);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-md border p-4 ">
        <legend className="fieldset-legend text-2xl">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          className="input w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <label className="label">Password</label>
        <input
          type="password"
          name="password"
          className="input w-full"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <button className="btn btn-neutral mt-4" onClick={handleLogin}>
          Login
        </button>

        {error && <p className="text-error">{error}</p>}

        <div className="flex items-center text-md pt-4 justify-end">
          <p className="">Don't have an account ?</p>
          <button className="btn btn-link text-blue-600 md:text-secondary md:hover:text-blue-600 ">
            <Link to="/signup">SignUp</Link>
          </button>
        </div>
      </fieldset>
    </div>
  );
}
