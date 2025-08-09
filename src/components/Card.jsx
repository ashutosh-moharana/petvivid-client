import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useRef } from "react";
import {useState} from 'react';
const Card = ({
  postId,
  title,
  imgUrl,
  petName,
  type,
  petType,
  description,
  isAdmin = false,
  handleDeletePost,
  handleEditPost,
}) => {
  const deleteRef = useRef();
  const editRef = useRef();
  const [editData, setEditData] = useState({
    title,
    petName,
    petType,
    type,
    description,
    picture: null,
  });
  return (
    <div className="card bg-base-100 shadow-xl h-full flex flex-col mb-2 border-b-2 border-red-500 ">
      <div className="card-body p-4 flex-none">
        <h2 className="card-title text-xl font-bold mb-2">{title}</h2>
      </div>
      <figure className="relative flex-1 min-h-[200px]">
        {isAdmin && (
          <div className="absolute top-2 right-2 flex gap-2 z-10">
            <button
              className="btn btn-square btn-sm bg-base-100 hover:bg-base-200 border-none"
              onClick={() => {
                editRef.current.showModal();
              }}
            >
              <FaEdit size={18} color="" />
            </button>
            <dialog id="edit_modal" ref={editRef} className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg mb-4">Edit Post</h3>
                <form
                  className="flex flex-col gap-3"
                  encType="multipart/form-data"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData();
                    formData.append("title", editData.title);
                    formData.append("petName", editData.petName);
                    formData.append("petType", editData.petType);
                    formData.append("type", editData.type);
                    formData.append("description", editData.description);
                    if (editData.picture) {
                      formData.append("picture", editData.picture);
                    }
                    await handleEditPost(postId, formData);
                    editRef.current.close();
                  }}
                >
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Title"
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Pet Name"
                    value={editData.petName}
                    onChange={(e) => setEditData({ ...editData, petName: e.target.value })}
                    required
                  />
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Pet Type"
                    value={editData.petType}
                    onChange={(e) => setEditData({ ...editData, petType: e.target.value })}
                    required
                  />
                  <select
                    className="select select-bordered w-full"
                    value={editData.type}
                    onChange={(e) => setEditData({ ...editData, type: e.target.value })}
                    required
                  >
                    <option value="lost">Lost</option>
                    <option value="found">Found</option>
                  </select>
                  <textarea
                    className="textarea textarea-bordered w-full"
                    placeholder="Description"
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    required
                  />
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full"
                    accept="image/*"
                    onChange={(e) => setEditData({ ...editData, picture: e.target.files[0] })}
                  />
                  <div className="modal-action flex justify-end gap-2">
                    <button type="button" className="btn" onClick={() => editRef.current.close()}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </dialog>
            <button
              className="btn btn-square btn-sm bg-base-100 hover:bg-base-200 border-none"
              onClick={() => {
                deleteRef.current.showModal();
              }}
            >
              <MdDeleteForever size={18} color="red" />
            </button>
            <dialog id="my_modal_3" ref={deleteRef} className="modal ">
              <div className="modal-box border border-red-600 md:ml-4">
                <p className="py-10 text-2xl text-center">
                   Are you sure you want to delete this ? This action cannot be undone.
                </p>
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                  <button
                    className="btn btn-error absolute bottom-2 right-2"
                    onClick={() => {
                      handleDeletePost(postId);
                    }}
                  >
                    Delete
                  </button>
                </form>
              </div>
            </dialog>
          </div>
        )}

        <img src={imgUrl} alt="Pet" className="w-full h-full object-cover" />
      </figure>
      <div className="card-body flex-none">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{petName}</h3>

          <div
            className={`badge ${
              type == "lost" ? "badge-error" : "badge-success"
            }`}
          >
            {type}
          </div>
        </div>
        <div className="text-sm">{petType}</div>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default Card;
