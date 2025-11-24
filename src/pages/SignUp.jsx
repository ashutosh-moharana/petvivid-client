import { useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import { BeatLoader } from 'react-spinners';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from '@react-oauth/google';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { setUser, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent default form submission if wrapped in form
    setError(""); // Clear previous errors

    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        { name, email, password }
      );
      if (!res.data.success) {
        throw new Error(res.data.message || "Signup failed");
      }
      setUser(res.data.user);
      setIsLoggedIn(res.data.success);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden pt-24">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-md bg-surface border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="absolute top-8 left-8">
          <BackButton />
        </div>

        <div className="text-center mb-10 mt-8">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-text-muted">Join the PetVivid community</p>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted ml-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-white/20"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted ml-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-white/20"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-muted ml-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder:text-white/20 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2 ml-1">{error}</p>}
          </div>

          <button
            className="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold transition-all shadow-lg shadow-red-900/20 mt-4"
            onClick={handleSignUp}
            disabled={loading}
          >
            {loading ? <BeatLoader size={10} color={"white"} /> : "Sign Up"}
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
              text="signup_with"
            />
          </div>
        </div>

        <div className="text-center mt-8 pt-6 border-t border-white/10">
          <p className="text-text-muted">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:text-primary-hover font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
