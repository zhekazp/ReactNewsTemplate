import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { addBlog, IBlogTest } from "./blogSliceTest";
import BlogTest from "./BlogTest";
// import axios from "axios";

const BlogListTest:FC = () => {
  const { blogsTest, status } = useSelector((state: RootState) => state.blogSliceTest);
  const [newBlog, setNewBlog] = useState<Omit<IBlogTest, "updatedAt" | "id">>({
    title: "",
    body: ""
  });

  const dispatch: AppDispatch = useDispatch();

  const handleAddBlog = () => {
    if (newBlog.title.trim()) {
      dispatch(
        addBlog({ ...newBlog, updatedAt: new Date(), id: blogsTest.length })
      );
      setNewBlog({
        title: "",
        body: ""
      });
    }
  };

  return (
    <div className="">
        <div className="">
      <h2 className="">Blogs</h2>
      <div className="">
        <input
          type="text"
          value={newBlog.title}
          onChange={(e) =>
            setNewBlog({ title: e.target.value, body:e.target.value })
          }
          className=""
          placeholder="New Post"
        />
        <button onClick={handleAddBlog} className="">
          Add Blog
        </button>
      </div>
      </div>
      <div className="">
        {status === "loading" && (
          <div className="" role="status">
            <span className="">Loading...</span>
          </div>
        )}
        {status === "success" && 
          blogsTest.map((blog, index) => (
            <BlogTest key={index} blog={blog} index={index} />
          ))}
        {status === "error" && (
          <>Error!</>
        )}
      </div>
    </div>
  );
};

export default BlogListTest;