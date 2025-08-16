import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import BackButton from "../components/BackButton";
export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useAuth();

  const handleSignUp = async (e) => {
    try {
       setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        formData,
        { withCredentials: true }
      );
      setUser(res.data.user);
      setIsLoggedIn(res.data.success);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <BackButton/>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-md border p-4 ">
        <legend className="fieldset-legend text-2xl">SignUp</legend>

        <label className="label">Name</label>
        <input
          type="text"
          name="name"
          className="input w-full"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
        />

        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          className="input w-full"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
        />

        <label className="label">Password</label>
        <input
          type="password"
          name="password"
          className="input w-full"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
        />

        <button className="btn btn-neutral mt-4" onClick={handleSignUp}>
          {loading ? <BeatLoader size={10} color={"white"} /> : "SignUp"}
        </button>

        {error && <p className="text-error">{error}</p>}

        <div className="flex items-center text-md pt-4 justify-end">
          <p className="">Already have an account ?</p>
          <button className="btn btn-link text-blue-600 md:text-secondary md:hover:text-blue-600 ">
            <Link to="/login">Login</Link>
          </button>
        </div>
      </fieldset>
    </div>
  );
}
