import Hero from "../components/Hero";
import Feed from "../components/Feed";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { isLoggedIn } = useAuth();
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
  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/posts/${postId}`, {
        withCredentials: true,
      });
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
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
          prevPosts.map((post) => {
            if (post._id === postId) {
              // If userId is missing in response, preserve old userId
              return {
                ...res.data.post,
                userId: res.data.post.userId || post.userId
              };
            }
            return post;
          })
        );
      }
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center w-full">
      {isLoggedIn ? (
        <Feed
          posts={posts}
          isAdmin={false}
          fetchPosts={fetchPosts}
          handleDeletePost={handleDeletePost}
          handleEditPost={handleEditPost}
        />
      ) : (
        <Hero />
      )}
    </div>
  );
}
