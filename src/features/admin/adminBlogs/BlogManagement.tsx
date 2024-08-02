import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, deleteBlog } from "../../blog/blogs/blogSlice"
import { AppDispatch, RootState } from "../../../store";
import { IBlog } from "../../blog/blogs/types";
import "../../blog/blogs/blogsStyles/blogList.css";

const BlogManagement: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const blogs = useSelector((state: RootState) => state.blogs.blogs);
  const status = useSelector((state: RootState) => state.blogs.status);
  const [searchId, setSearchId] = useState<string>("");
  const [filteredBlogs, setFilteredBlogs] = useState<IBlog[]>([]);

  useEffect(() => {
     dispatch(fetchBlogs({ page: 0, region: 0 }));
  }, [dispatch]);

  useEffect(() => {
    if (searchId) {
      setFilteredBlogs(
        blogs.filter((blog) => blog.id.toString().includes(searchId))
      );
    } else {
      setFilteredBlogs(blogs);
    }
  }, [searchId, blogs]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(e.target.value);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteBlog(id));
    }
  };

  return (
    <div className="blogManagement_container">
      <h1>Blog Management</h1>
      <div className="search_container">
        <input
          type="text"
          placeholder="Search by ID..."
          value={searchId}
          onChange={handleSearchChange}
          className="search_input"
        />
      </div>
      {status === "loading" && (
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {status === "success" && (
        <div className="blogList_container">
          {filteredBlogs.length === 0 ? (
            <p>No blogs found.</p>
          ) : (
            <ul className="blogList">
              {filteredBlogs.map((blog) => (
                <li key={blog.id} className="blogItem">
                  <h2>{blog.title}</h2>
                  <p>{blog.publishedDate}</p>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="delete_button"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {status === "error" && <div>Error fetching blogs.</div>}
    </div>
  );
};

export default BlogManagement;
