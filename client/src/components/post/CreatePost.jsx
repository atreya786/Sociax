import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../features/post/postSlice";
import ImageUpload from "../common/ImageUpload";
import { prepareImageData } from "../../services/upload";

const CreatePost = () => {
  const dispatch = useDispatch();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = prepareImageData(image);
    formData.append("caption", caption);

    dispatch(createPost(formData));

    setCaption("");
    setImage(null);
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h3 className="font-semibold mb-2">Create Post</h3>

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Write a caption"
          className="w-full border rounded p-2 mb-3"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <ImageUpload onSelect={(file) => setImage(file)} />

        <button
          disabled={!image}
          type="submit"
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
