import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import CreatePost from "../components/post/CreatePost";
import Loader from "../components/common/Loader";

import { fetchPosts } from "../features/post/postSlice";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import PostCard from "../components/post/PostCard";

const Feed = () => {
  // Redux hooks
  const dispatch = useDispatch();

  // Post state from Redux
  const { posts, page, hasMore, isLoading } = useSelector(
    (state) => state.post
  );

  // Fetch first page on initial load
  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts(1));
    }
  }, [dispatch, posts.length]);

  // Function to load next page
  const loadMorePosts = useCallback(() => {
    if (!isLoading && hasMore) {
      dispatch(fetchPosts(page));
    }
  }, [dispatch, page, isLoading, hasMore]);

  // Activate infinite scroll
  useInfiniteScroll({
    isLoading,
    hasMore,
    onLoadMore: loadMorePosts,
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto py-6">
        <h1 className="text-2xl font-bold text-center mb-6">Home Feed</h1>
        // First load state
        {isLoading && posts.length === 0 && (
          <p className="text-center text-gray-600">Loading posts...</p>
        )}
        // Empty state
        {!isLoading && posts.length === 0 && (
          <p className="text-center text-gray-500">No posts yet</p>
        )}
        <div className="max-w-2xl mx-auto py-6">
          <CreatePost />
          // Posts list
          <div className="space-y-4">
            {posts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
          // Loading more indicator
          {isLoading && posts.length === 0 && <Loader />}
          // End message
          {!hasMore && posts.length > 0 && (
            <p className="text-center text-gray-500 mt-10">
              No posts yet. Be the first to share something.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;
