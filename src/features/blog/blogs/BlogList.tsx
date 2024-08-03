import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "./blogSlice";
import { AppDispatch, RootState } from "../../../store";
import { useNavigate, useSearchParams } from "react-router-dom";
import BlogItem from "./BlogItem";
import { IBlog } from "./types";
import "./blogsStyles/blogList.css";
import Breadcrumb from "./Breadcrumb";


const BlogList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error, pageCount, currentPage } = useSelector(
    (state: RootState) => state.blogs
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const blogs: IBlog[] = useSelector((state: RootState) => state.blogs.blogs);

  const [filters, setFilters] = useState({
    region: searchParams.get("region") || "0",
    page: searchParams.get("page") || "0",
  });

  const navigate = useNavigate();

  // const handleAddBlogClick = () => {
  //   navigate("/add-blog");
  // };

  const [authError, setAuthError] = useState<string | null>(null);

  const handleAddBlogClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate("/add-blog");
    } else {
      setAuthError('Sie müssen sich anmelden, um einen neuen Blog hinzuzufügen.');
    }
  };

  useEffect(() => {
    const page = parseInt(filters.page, 10);
    const region = parseInt(filters.region, 10);

    dispatch(fetchBlogs({ page, region }));
  }, [dispatch, filters]);

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage.toString() }));
    setSearchParams({ region: filters.region, page: newPage.toString() });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFilters((prev) => ({ ...prev, region: value, page: "0" }));
    setSearchParams({ region: value, page: "0" });
  };

  return (
    <div className="blogList_container">
      <Breadcrumb />
      <button className="newBlog_button" onClick={handleAddBlogClick}>
        Neuer Blog
      </button>
      {authError && <p className="error">{authError}</p>}
      <div>
        <select
          className="blogList_select"
          name="region"
          value={filters.region}
          onChange={handleFilterChange}
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
      </div>

      {status === "loading" && (
        <div className="spinner-border text-secondary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {status === "success" && (
        <div className="blogList-items_container">
          {/* <h1 className="blogs-title">Blogs</h1> */}
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
