import { MdCreate } from "react-icons/md";
import Card from "./Card";
import { useState, useRef } from "react";
import axios from "axios";

const Feed = ({ posts, isAdmin, handleDeletePost, handleEditPost, fetchPosts }) => {
  const [data, setData] = useState({
    title: "",
    petName: "",
    petType: "",
    type: "",
    description: "",
    picture: "",
  });

  const createRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Post creation started ");
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("petName", data.petName);
    formData.append("petType", data.petType);
    formData.append("type", data.type);
    formData.append("description", data.description);
    if (data.picture) {
      formData.append("picture", data.picture);
    }
    const createdPost = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/posts`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    console.log(createdPost);
    console.log("Post created Successfully !");
    createRef.current.close();
    setData({
      title: "",
      petName: "",
      petType: "",
      type: "",
      description: "",
      picture: "",
    });
    fetchPosts();
  };

  return (
    <div className=" flex-1 md:w-1/3  flex flex-col   h-full">
      {[...posts].reverse().map((post) => {
        return (
          <Card
            key={post._id}
            postId={post._id}
            title={post.title}
            imgUrl={post.picture}
            petName={post.petName}
            type={post.type}
            petType={post.petType}
            description={post.description}
            isAdmin={isAdmin}
            handleDeletePost={handleDeletePost}
            handleEditPost={handleEditPost}
          />
        );
      })}

      <div className="bg-black rounded-full  fixed bottom-4 right-4 p-2 border-2 border-red-600">
        <button
          className="btn btn-square btn-sm bg-base-100 hover:bg-base-200 border-none "
          onClick={() => {
            createRef.current.showModal();
          }}
        >
          <MdCreate size={"1.5rem"}   />
        </button>
        <dialog id="edit_modal" ref={createRef} className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Create Post</h3>
            <form
              className="flex flex-col gap-3"
              encType="multipart/form-data"
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Title"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                required
              />
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Pet Name"
                value={data.petName}
                onChange={(e) => setData({ ...data, petName: e.target.value })}
                required
              />
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Pet Type"
                value={data.petType}
                onChange={(e) => setData({ ...data, petType: e.target.value })}
                required
              />
              <select
                className="select select-bordered w-full"
                value={data.type}
                onChange={(e) => setData({ ...data, type: e.target.value })}
                required
              >
                <option value="lost">Lost</option>
                <option value="found">Found</option>
              </select>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Description"
                value={data.description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
                required
              />
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                accept="image/*"
                onChange={(e) =>
                  setData({ ...data, picture: e.target.files[0] })
                }
              />
              <div className="modal-action flex justify-end gap-2">
                <button
                  type="button"
                  className="btn"
                  onClick={() => createRef.current.close()}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Feed;
