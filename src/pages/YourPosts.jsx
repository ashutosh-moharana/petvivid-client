import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";

const YourPosts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  const handleDeletePost = async (postId) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/posts/${postId}`, {
      withCredentials: true,
    });
    setPosts(posts.filter((post) => post._id !== postId));
  };

  const handleEditPost = async (postId, formData) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/posts/${postId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data && res.data.post) {
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post._id === postId ? res.data.post : post))
        );
      }
    } catch (err) {
      console.log("Error encountered:", err);
    }
  };
  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`);

      const data = res.data.filter((post) => post.userId == user._id);
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user?._id) {
      fetchPosts();
    }
  }, [user]);
  return (
    <div className=" min-h-screen relative flex flex-col items-center">
      <Navbar />
      <Feed
        posts={posts}
        isAdmin={true}
        handleDeletePost={handleDeletePost}
        handleEditPost={handleEditPost}
        fetchPosts={fetchPosts}
      />
    </div>
  );
};

export default YourPosts;
