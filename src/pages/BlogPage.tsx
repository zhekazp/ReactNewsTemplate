import React, {useEffect} from "react";
import BlogList from "../features/blog/blogs/BlogList";
import { useDispatch} from "react-redux";
import { topSlice } from "../layout/header/topElSlice";
const BlogPage = () => {
  useEffect(() => {
    const dispatch = useDispatch();
    dispatch(topSlice.actions.setCurrentPage(1));
  
  }, []);
  return (
    <div>
      <BlogList />
    </div>
  );
};

export default BlogPage;
