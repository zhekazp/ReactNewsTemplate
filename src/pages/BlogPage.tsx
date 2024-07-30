import React from "react";
import BlogList from "../features/blog/blogs/BlogList";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../features/blog/blogs/Breadcrumb";

const BlogPage = () => {
  const navigate = useNavigate();

  const handleAddBlogClick = () => {
    navigate("/add-blog");
  };

  return (
    <div>
      <div>
        <Breadcrumb />
        <button onClick={handleAddBlogClick}>New Blog</button>
      </div>
      <BlogList />
    </div>
  );
};

export default BlogPage;
