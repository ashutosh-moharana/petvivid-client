import { useState } from "react";
import { MdDelete, MdEdit, MdMoreVert, MdFavorite, MdShare, MdLocationOn } from "react-icons/md";
import { BeatLoader } from "react-spinners";
import { useAuth } from "../context/AuthContext";

const Card = ({ post, isAdmin, handleDeletePost, handleEditPost }) => {
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: post.name,
    type: post.type,
    description: post.description,
    image: null,
  });

  const isOwner = user && post.userId && user._id === post.userId._id;
  const canEdit = isAdmin || isOwner;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("type", formData.type);
    data.append("description", formData.description);
    if (formData.image) {
      data.append("image", formData.image);
    }

    setLoading(true);
    await handleEditPost(post._id, data);
    setLoading(false);
    setIsEditModalOpen(false);
  };

  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    return `${days}d`;
  };

  return (
    <>
      <article className="group w-full bg-surface/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300">
        {/* Image Container with Overlay Badge */}
        <div className="relative w-full aspect-square overflow-hidden bg-black">
          <img
            src={post.picture}
            alt={post.name}
            className="w-full h-full object-cover"
          />

          {/* Status Badge - Glassmorphism */}
          <div className="absolute top-4 left-4">
            <div className={`px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-md border ${post.type === "lost"
              ? "bg-red-500/20 border-red-500/30 text-red-100"
              : "bg-green-500/20 border-green-500/30 text-green-100"
              }`}>
              {post.type}
            </div>
          </div>

          {/* Actions Overlay */}
          {canEdit && (
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setShowActions(!showActions)}
                className="p-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-white hover:bg-black/60 transition-all"
              >
                <MdMoreVert size={20} />
              </button>

              {showActions && (
                <div className="absolute right-0 top-full mt-2 w-36 bg-surface/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                  <button
                    onClick={() => { setIsEditModalOpen(true); setShowActions(false); }}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-white hover:bg-white/5 transition-colors"
                  >
                    <MdEdit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => { setIsDeleteModalOpen(true); setShowActions(false); }}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-white/5 transition-colors"
                  >
                    <MdDelete size={16} />
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* User Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-white/10 overflow-hidden flex items-center justify-center">
                {post.userId && post.userId.userpic ? (
                  <img src={post.userId.userpic} alt={post.userId.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm font-bold text-primary">
                    {post.userId ? post.userId.name.charAt(0).toUpperCase() : "U"}
                  </span>
                )}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  {post.userId ? post.userId.name : "Unknown User"}
                </h3>
                <p className="text-xs text-text-muted">
                  {post.createdAt ? timeAgo(post.createdAt) : "Recently"}
                </p>
              </div>
            </div>
          </div>

          {/* Pet Info */}
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white">{post.name}</h2>
            <p className="text-sm text-text-muted leading-relaxed line-clamp-2">
              {post.description}
            </p>
          </div>

          {/* Location */}
          {post.location && (
            <div className="flex items-center gap-2 text-xs text-text-muted">
              <MdLocationOn size={14} className="text-primary" />
              <span>{post.location}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2 border-t border-white/5">
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-text-muted hover:text-primary transition-colors rounded-lg hover:bg-white/5">
              <MdFavorite size={18} />
              <span>Save</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-text-muted hover:text-white transition-colors rounded-lg hover:bg-white/5">
              <MdShare size={18} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </article>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-surface border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">Edit Post</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-text-muted hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdate} className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">Pet Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">Status</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="Lost">Lost</option>
                  <option value="Found">Found</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-muted">Update Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white file:cursor-pointer hover:file:bg-primary-hover"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 px-6 py-3 bg-background border border-white/10 text-white rounded-xl hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold transition-all shadow-lg disabled:opacity-50"
                >
                  {loading ? <BeatLoader size={8} color="white" /> : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-surface border border-white/10 rounded-2xl w-full max-w-md shadow-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-3">Delete Post</h3>
            <p className="text-text-muted mb-6">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 px-6 py-3 bg-background border border-white/10 text-white rounded-xl hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDeletePost(post._id);
                  setIsDeleteModalOpen(false);
                }}
                className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
