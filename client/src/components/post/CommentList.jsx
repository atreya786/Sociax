import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../features/comment/commentSlice";

const CommentList = ({ postId }) => {
  const dispatch = useDispatch();

  const comments =
    useSelector((state) => state.comment.commentsByPost[postId]) || [];

  const isLoading = useSelector((state) => state.comment.isLoading);

  // Load comments on mount
  useEffect(() => {
    dispatch(fetchComments(postId));
  }, [dispatch, postId]);

  return (
    <div className="mt-2 space-y-1">
      {isLoading && (
        <p className="text-xs text-gray-400">Loading comments...</p>
      )}

      {comments.map((comment, index) => (
        <p key={index} className="text-sm">
          <span className="font-semibold mr-1">
            {comment.user?.email || "User"}
          </span>
          {comment.text}
        </p>
      ))}
    </div>
  );
};

export default CommentList;
