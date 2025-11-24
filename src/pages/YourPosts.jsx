import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Feed from "../components/Feed";

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
          prevPosts.map((post) => (
            post._id === postId 
              ? { ...res.data.post, userId: res.data.post.userId || post.userId }
              : post
          ))
        );
      }
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`);
      const data = res.data.filter((post) => post.userId && post.userId._id === user._id);
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
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-lg mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Your Posts</h1>
          <p className="text-text-muted">Manage all your posted pets here</p>
        </div>
        <Feed
          posts={posts}
          isAdmin={false}
          handleDeletePost={handleDeletePost}
          handleEditPost={handleEditPost}
          fetchPosts={fetchPosts}
        />
      </div>
    </div>
  );
};

export default YourPosts;
