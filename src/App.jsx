import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import YourPosts from "./pages/YourPosts";
import Layout from "./components/Layout";

import { AuthProvider } from "./context/AuthContext";
import { BeatLoader } from "react-spinners";


import { lazy, Suspense } from "react";
const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/Login"));
const About = lazy(() => import("./pages/About"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Contact = lazy(() => import("./pages/Contact"));




export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div className="h-screen flex justify-center items-center"><BeatLoader size={15} color="white" /></div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/your-posts" element={<YourPosts />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>

  );
}
