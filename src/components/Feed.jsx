import { useState } from "react";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { MdAdd, MdClose, MdImage } from "react-icons/md";
import Card from "./Card";

const Feed = ({ posts, isAdmin, handleDeletePost, handleEditPost, fetchPosts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "Lost",
    description: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("type", formData.type);
    data.append("description", formData.description);
    data.append("image", formData.image);
    data.append("createdAt", new Date().toISOString());

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_URL}/api/posts/create`, data, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      setLoading(false);
      setIsModalOpen(false);
      setFormData({ name: "", type: "Lost", description: "", image: null });
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto pb-20 pt-24 px-4">
      {/* Feed Header / Create Post Trigger */}
      {!isAdmin && (
        <div className="mb-8 flex justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="fixed bottom-8 right-8 z-40 flex items-center justify-center w-14 h-14 bg-primary hover:bg-primary-hover text-white rounded-full shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all duration-300 border border-white/10"
            title="Create Post"
          >
            <MdAdd size={32} />
          </button>
        </div>
      )}

      {/* Posts List */}
      <div className="flex flex-col gap-8">
        {[...posts].reverse().map((post) => (
          <Card
            key={post._id}
            post={post}
            isAdmin={isAdmin}
            handleDeletePost={handleDeletePost}
            handleEditPost={handleEditPost}
          />
        ))}
        {posts.length === 0 && (
          <div className="text-center py-20 border border-white/5 rounded-3xl bg-surface/50">
            <p className="text-text-muted text-lg">No posts yet. Be the first to share!</p>
          </div>
        )}
      </div>

      {/* Create Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-surface border border-white/10 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">Create New Post</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-text-muted hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
              >
                <MdClose size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted ml-1">Pet Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Fluffy"
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted ml-1">Status</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: "Lost" })}
                    className={`py-3 rounded-xl font-bold transition-all border ${formData.type === "Lost"
                        ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-900/20"
                        : "bg-transparent border-white/10 text-text-muted hover:border-red-600 hover:text-red-600"
                      }`}
                  >
                    Lost
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: "Found" })}
                    className={`py-3 rounded-xl font-bold transition-all border ${formData.type === "Found"
                        ? "bg-green-600 border-green-600 text-white shadow-lg shadow-green-900/20"
                        : "bg-transparent border-white/10 text-text-muted hover:border-green-600 hover:text-green-600"
                      }`}
                  >
                    Found
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted ml-1">Description</label>
                <textarea
                  name="description"
                  placeholder="Describe the pet, location, and any other details..."
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white h-32 resize-none focus:outline-none focus:border-primary transition-colors"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted ml-1">Photo</label>
                <div className="relative">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-primary hover:bg-white/5 transition-colors"
                  >
                    {formData.image ? (
                      <span className="text-primary font-medium">{formData.image.name}</span>
                    ) : (
                      <>
                        <MdImage size={32} className="text-text-muted mb-2" />
                        <span className="text-sm text-text-muted">Click to upload image</span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-lg shadow-lg shadow-red-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <BeatLoader size={10} color="white" /> : "Post Alert"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
