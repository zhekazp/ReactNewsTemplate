import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, fetchUserBlogs } from "./blogSlice";
import { AppDispatch, RootState } from "../../../store";
import { useNavigate, useSearchParams } from "react-router-dom";
import BlogItem from "./BlogItem";
import { IBlog } from "./types";
import "./blogsStyles/blogList.css";
import Breadcrumb from "./Breadcrumb";
import { topSlice } from "../../../layout/header/topElSlice";

const BlogList: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { status, error, pageCount, currentPage, blogs } = useSelector(
    (state: RootState) => state.blogs
  );
  const [showUserBlogs, setShowUserBlogs] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    region: searchParams.get("region") || "0",
    page: searchParams.get("page") || "0",
  });


  useEffect(() => {
    const page = parseInt(filters.page, 10);
    const region = parseInt(filters.region, 10);
    dispatch(topSlice.actions.setCurrentPage(2));
    if (showUserBlogs) {
      dispatch(fetchUserBlogs({ page }));
    } else {
      dispatch(fetchBlogs({ page, region }));
    }
  }, [dispatch, filters, showUserBlogs]);

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage.toString() }));
    setSearchParams({ region: filters.region, page: newPage.toString() });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFilters((prev) => ({ ...prev, region: value, page: "0" }));
    setSearchParams({ region: value, page: "0" });
  };

  const handleAddBlogClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/add-blog");
    } else {
      setAuthError(
        "Sie müssen sich anmelden, um einen neuen Blog hinzuzufügen."
      );
    }
  };

  const handleShowUserBlogs = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthError("Sie müssen sich anmelden, um Ihre Blogs zu sehen.");
      return;
    }
    setShowUserBlogs(true);
    setFilters((prev) => ({ ...prev, page: "0" }));
    setSearchParams({ region: "0", page: "0" });
  };

  const handleShowAllBlogs = () => {
    setShowUserBlogs(false);
    setFilters((prev) => ({ ...prev, page: "0" }));
    setSearchParams({ region: filters.region, page: "0" });
  };

  return (
    <div className="blogList_container">
      <Breadcrumb />
      <div className="meine-blog_buttons">
      <button className="newBlog_button" onClick={handleAddBlogClick}>
        Neuer Blog
      </button>
        <button
          className="meineBlog_button"
          onClick={handleShowUserBlogs}
          disabled={showUserBlogs}
        >
          Meine Blogs
        </button>
      {showUserBlogs && (
        <button className="newBlog_button" onClick={handleShowAllBlogs}>
          Alle Blogs
        </button>
      )}
      </div>
      {authError && <p className="error">{authError}</p>}
      <div>
        <select
          className="blogList_select"
          name="region"
          value={filters.region}
          onChange={handleFilterChange}
          disabled={showUserBlogs}
        >
          <option value="0">Alle Regionen</option>
          <option value="1">Keine Region</option>
          <option value="2">Baden-Württemberg</option>
          <option value="3">Bayern</option>
          <option value="4">Berlin</option>
          <option value="5">Brandenburg</option>
          <option value="6">Bremen</option>
          <option value="7">Hamburg</option>
          <option value="8">Hessen</option>
          <option value="9">Mecklenburg-Vorpommern</option>
          <option value="10">Niedersachsen</option>
          <option value="11">Nordrhein-Westfalen</option>
          <option value="12">Rheinland-Pfalz</option>
          <option value="13">Saarland</option>
          <option value="14">Sachsen</option>
          <option value="15">Sachsen-Anhalt</option>
          <option value="16">Schleswig-Holstein</option>
          <option value="17">Thüringen</option>
          <option value="18">Deutschland</option>
        </select>
        {showUserBlogs && (
          <p className="info-message">
            Filterung nach Regionen ist im Modus 'Meine Blogs' nicht verfügbar. Bitte wechseln Sie zum Modus 'Alle Blogs', um diese Funktion zu nutzen.
          </p>
        )}
      </div>

      {status === "loading" && (
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Laden...</span>
        </div>
      )}
      {status === "success" && (
        <div className="blogList-items_container">
          <div>
            {blogs.map((blog) => (
              <BlogItem key={blog.id} blogItem={blog} />
            ))}
          </div>
          <div className="pagination">
            {Array.from({ length: pageCount }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index)}
                disabled={index === currentPage}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
      {status === "error" && <div>Error: {error}</div>}
    </div>
  );
};

export default BlogList;
