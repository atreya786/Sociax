import PostActions from "./PostActions";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import React from "react";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded shadow overflow-hidden">
      <div className="flex items-center p-3">
        <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
        <span className="font-semibold text-sm">
          {post.user?.email || "User"}
        </span>
      </div>
      <div className="w-full bg-black">
        <img
          src={post.image || "https://via.placeholder.com/400"}
          alt="post"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400";
          }}
          className="w-full object-cover max-h-96"
        />
      </div>
      <div className="p-3">
        <p className="text-sm">
          <span className="font-semibold mr-1">
            {post.user?.email || "User"}
          </span>
          {post.caption}
        </p>
      </div>
      <div className="px-3">
        <PostActions post={post} />
      </div>
      <div className="px-3 pb-3">
        <CommentList postId={post._id} />
        <CommentInput postId={post._id} />
      </div>
    </div>
  );
};

export default PostCard;
