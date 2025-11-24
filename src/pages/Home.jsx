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
        // The updated post from server might not have populated user, 
        // but we can merge it with existing post user data or re-fetch.
        // For simplicity, let's re-fetch to ensure data consistency, 
        // or manually preserve the user object if the backend doesn't return it populated.
        // If we just replace, we might lose the populated user object if the backend returns unpopulated.
        // Let's check if res.data.post has user populated. Usually update returns the document as is in DB (unpopulated unless specified).
        // So safe bet is to re-fetch or manually patch.
        // Let's try re-fetching for now to be safe, or just update fields and keep user.

        // Optimistic update preserving user:
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === postId ? { ...res.data.post, userId: post.userId } : post
          )
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
