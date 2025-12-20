import { useDispatch } from "react-redux";
import { toggleLike } from "../../features/post/postSlice";

const PostActions = ({ post }) => {
  const dispatch = useDispatch();

  // Handle like click
  const handleLike = () => {
    dispatch(toggleLike(post._id));
  };

  return (
    <div className="flex gap-4 text-sm text-gray-600 mt-2">
      <button onClick={handleLike} className="hover:text-black font-semibold">
        Like {post.likes?.length || 0}
      </button>

      <button className="hover:text-black">Comment</button>
    </div>
  );
};

export default PostActions;
