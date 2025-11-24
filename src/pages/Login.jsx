import { useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import { BeatLoader } from 'react-spinners';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    try {
      setLoading(true);
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
      setLoading(false);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-md bg-surface border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="absolute top-6 left-6">
          <BackButton />
        </div>

        <div className="text-center mb-10 mt-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-text-muted">Sign in to continue to PetVivid</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted ml-1">Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-white/20"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted ml-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-white/20"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mt-2 ml-1">{error}</p>}
          </div>

          <button
            className="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold transition-all shadow-lg shadow-red-900/20 mt-4"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <BeatLoader size={10} color={"white"} /> : "Login"}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-surface text-text-muted">Or continue with</span>
            </div>
          </div>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  setLoading(true);
                  const res = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/auth/google`,
                    { credential: credentialResponse.credential },
                    { withCredentials: true }
                  );
                  if (res.data.success) {
                    setUser(res.data.user);
                    setIsLoggedIn(true);
                    navigate("/");
                  }
                } catch (err) {
                  console.error("Google Login Failed", err);
                  setError("Google Login Failed");
                } finally {
                  setLoading(false);
                }
              }}
              onError={() => {
                console.log('Login Failed');
                setError("Google Login Failed");
              }}
              theme="filled_black"
              shape="pill"
              text="signin_with"
            />
          </div>
        </div>

        <div className="text-center mt-8 pt-6 border-t border-white/10">
          <p className="text-text-muted">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:text-primary-hover font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
