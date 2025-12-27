import { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../features/comment/commentSlice";
import React from "react";

const CommentInput = ({ postId }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim().length === 0) return;

    dispatch(addComment({ postId, text }));
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex">
      <input
        type="text"
        placeholder="Add a comment"
        className="flex-1 border rounded px-2 py-1 text-sm"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        type="submit"
        className="ml-2 text-blue-600 text-sm font-semibold"
      >
        Post
      </button>
    </form>
  );
};

export default CommentInput;
