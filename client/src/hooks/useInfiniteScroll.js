import { useEffect } from "react";

// Custom hook for infinite scrolling
const useInfiniteScroll = ({ isLoading, hasMore, onLoadMore }) => {
  useEffect(() => {
    const handleScroll = () => {
      // Distance from bottom
      const scrollTop = document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      // Trigger when user reaches near bottom
      if (
        scrollTop + windowHeight >= scrollHeight - 100 &&
        !isLoading &&
        hasMore
      ) {
        onLoadMore();
      }
    };

    // Attach scroll listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, hasMore, onLoadMore]);
};

export default useInfiniteScroll;
