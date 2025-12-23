import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../features/comment/commentSlice";
import { deleteComment } from "../../features/comment/commentSlice";
import Loader from "../common/Loader";

const CommentList = ({ postId }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user);

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

      {comments.map((comment) => (
        <div key={comment._id} className="flex justify-between items-center">
          <p className="text-sm">
            <span className="font-semibold mr-1">
              {comment.user?.email || "User"}
            </span>
            {comment.text}
          </p>

          {currentUser?._id === comment.user?._id && (
            <button
              onClick={() =>
                dispatch(
                  deleteComment({
                    postId,
                    commentId: comment._id,
                  })
                )
              }
              className="text-xs text-red-500"
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
