import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Feed from "../components/Feed";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { isLoggedIn} = useAuth();
  const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/posts`
        );
        setPosts(res.data);
      } catch (error) {
        console.log(error)
      }
    };
  useEffect(() => {
    
    if (isLoggedIn) fetchPosts();
  }, [isLoggedIn]);
  return (
    <div className="min-h-screen relative flex flex-col items-center ">
      <Navbar />
      {isLoggedIn ? <Feed posts={posts} isAdmin={false} fetchPosts={fetchPosts}/> : <Hero />}
    </div>
  );
}
