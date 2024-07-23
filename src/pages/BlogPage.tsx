import React, { useEffect } from "react";
// import BlogList from "../features/blog/BlogList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { fetchBlogsTest } from "../features/blog/blogsTest/blogSliceTest";
import BlogListTest from "../features/blog/blogsTest/BlogListTest";
// import NewBlogForm from "../features/blog/NewBlogForm";
// import { fetchBlogs, fetchComments } from "../features/blog/blogSlice";

const BlogPage = () => {
  // const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    // dispatch(fetchBlogs())
    dispatch(fetchBlogsTest());
  }, [dispatch]);

  return (
    <div>
      <BlogListTest />
      {/* <NewBlogForm currentUser={currentUser}/>
      <BlogList currentUser={currentUser} /> */}
    </div>
  );
};

export default BlogPage;
