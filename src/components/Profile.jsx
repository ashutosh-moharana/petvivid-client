import React from "react";
import { useNavigate,Navigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useState, useEffect } from "react";
const Profile = () => {
  const { isLoggedIn, authLoading ,user,logout} = useAuth();

  // Replace with actual auth check
  const [activeTab, setActiveTab] = useState("my");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const navigate = useNavigate();
  // Mock posts data
  const [posts, setPosts] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    petName:"",
    petType: "",
    type: "lost",
    description: "",
    picture: "",
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/posts`, {
          withCredentials: true,
        });
        setPosts(res.data);
        
        
      } catch (err) {}
    };
    fetchPosts();
  }, []);

  const handleSubmitPost = async (e) => {
    e.preventDefault();

    try{
           const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/posts`,formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true
       })
     setPosts([...posts])
       
    }catch(err){
      console.log("Error encountered :" ,err);
      
    }

    setIsModalOpen(false);
    setEditPost(null);
    setFormData({ title: "",petName:"",petType:"", type: "lost", description: "", picture: "" });
  };

  const handleEditPost = async (e) => {
    e.preventDefault();

    try{
           const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/posts/${editPost._id}`,editPost,{
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true
       })
     setPosts([...posts])
       
    }catch(err){
      console.log("Error encountered :" ,err);
      
    }

    setIsModalOpen(false);
    setEditPost(null);
  };

  const handleDeletePost = async (postId) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/posts/${postId}`, {
      withCredentials: true, })

    setPosts(posts.filter((post) => post._id !== postId));
  };

  const handleLogout = async () => {
    try{
      logout();
      navigate('/')
    }catch(err){
      console.error("Error logging out:", err);
    }
  }

  if (authLoading) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center h-screen space-x-4">
        <div className="flex space-x-2">
          <div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce animation-delay-150"></div>
          <div className="h-3 w-3 bg-blue-600 rounded-full animate-bounce animation-delay-300"></div>
        </div>
        <p className="text-gray-600 font-extralight text-3xl">
          Finding your furry friends...
        </p>
      </div>
    );
  }
 
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.name.split(' ').slice(0,1)}!</h1>
          <div className="flex flex-col gap-3.5">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
          >
           Logout
          </button>
            <button
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
          >
            Create Post
          </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-8">
          <button
            className={`px-6 py-2 ${
              activeTab === "my"
                ? "border-b-2 border-orange-500 text-orange-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("my")}
          >
            My Posts
          </button>
          <button
            className={`px-6 py-2 ${
              activeTab === "all"
                ? "border-b-2 border-orange-500 text-orange-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All Posts
          </button>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeTab === "all"
            ? [...posts]
            : posts.filter((p) => p.userId === user._id)
          ).reverse().map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              {post.picture && (
                <img
                  src={post.picture}
                  alt={post.title}
                  className="w-full h-80 object-cover"
                />
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm 
                    ${
                      post.type === "lost"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {post.type}
                  </span>
                  {post.userId === user._id && activeTab=='my' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditPost(post);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePost(post._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600">{post.description}</p>
                <div className="mt-4 text-sm text-gray-500">
                  Posted on {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create/Edit Post Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">
                {editPost ? "Edit Post" : "Create New Post"}
              </h2>
              <form onSubmit={editPost? handleEditPost : handleSubmitPost} className="space-y-4" encType="multipart/form-data">
                <div>
                  <label className="block text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                    value={editPost ? editPost.title : formData.title}
                onChange={(e) => {
                      if(editPost) {
                        setEditPost({ ...editPost, title: e.target.value });
                      }else{
                        setFormData({ ...formData, title: e.target.value })
                      }
                    }
                      
                    }
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Pet Name </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                    value={editPost? editPost.petName : formData.petName}
                    onChange={(e) =>{
                      if(editPost) {
                        setEditPost({ ...editPost, petName: e.target.value });
                      }else{
                        setFormData({ ...formData, petName: e.target.value })
                      }
                    }
                  }
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Pet Type</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                    value={editPost? editPost.petType:formData.petType}
                    onChange={(e) =>{
                      if(editPost) {
                        setEditPost({ ...editPost, petType: e.target.value });
                      }else{
                        setFormData({ ...formData, petType: e.target.value })
                      }
                    }
                    }
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Type</label>
                  <select
                    className="w-full px-4 py-2 border rounded-lg"
                    value={editPost? editPost.type:formData.type}
                    onChange={(e) =>{
                      if(editPost) {
                        setEditPost({ ...editPost, petType: e.target.value });
                      }else{
                        setFormData({ ...formData, petType: e.target.value })
                      }
                    }
                    }
                  >
                    <option value="lost">Lost</option>
                    <option value="found">Found</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    required
                    className="w-full px-4 py-2 border rounded-lg resize-none"
                    value={editPost ? editPost.description:formData.description}
                    onChange={(e) =>{
                      if(editPost) {
                        setEditPost({ ...editPost, description: e.target.value });
                      }else{
                        setFormData({ ...formData, description: e.target.value })
                      }
                    }
                    }
                    rows="4"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Picture</label>
                  <input
                    type="file"
                    className="w-full px-4 py-2 border rounded-lg"
                    
                    onChange={(e) =>{
                      if(editPost) {
                        setEditPost({ ...editPost, picture: e.target.files[0] });
                      }else{
                        
                      setFormData({ ...formData, picture: e.target.files[0] })
                      }
                    }
                    }
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditPost(null);
                    }}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                  >
                    {editPost ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Profile;
