import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "./blogSlice";
import { AppDispatch, RootState } from "../../../store";
import { useNavigate, useSearchParams } from "react-router-dom";
import BlogItem from "./BlogItem";
import { IBlog } from "./types";
import "./blogsStyles/blogList.css";
import Breadcrumb from "./Breadcrumb";

// const BlogList: React.FC = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const { blogs, status, error, pageCount, currentPage } = useSelector((state: RootState) => state.blogs);

//   useEffect(() => {
//     // Загружаем данные только при первом рендере
//     dispatch(fetchBlogs({ page: currentPage, region: 0 }));
//   }, [dispatch, currentPage]);

//   const handlePageChange = (page: number) => {
//     console.log('Changing page to:', page); // Debug log
//     dispatch(fetchBlogs({ page: page-1, region: 0 })); // Учитываем нумерацию страниц с 0
//   };

//   return (
//     <div>
//       {status === 'loading' && (
//         <div className="spinner-border text-secondary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       )}
//       {status === 'success' && (
//         <div>
//           <h1>Blogs</h1>
//           <ul>
//             {blogs.map((blog) => (
//               <BlogItem key={blog.id} blog={blog} />
//             ))}
//           </ul>
//           <div>
//             {Array.from({ length: pageCount }).map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => handlePageChange(index+1)}
//                 disabled={index === currentPage}
//               >
//                 {index + 1}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//       {status === 'error' && <div>Error: {error}</div>}
//     </div>
//   );
// };

// export default BlogList;

// const BlogList: React.FC = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const { blogs, status, error, pageCount, currentPage } = useSelector((state: RootState) => state.blogs);
//   const [searchParams, setSearchParams] = useSearchParams();

//   useEffect(() => {
//     const page = parseInt(searchParams.get('page') || '1', 10) - 1;
//     dispatch(fetchBlogs({ page, region: 0 }));
//   }, [dispatch, searchParams]);

//   const handlePageChange = (page: number) => {
//     setSearchParams({ page: page.toString() });
//   };

//   return (
//     <div>
//       {status === 'loading' && (
//         <div className="spinner-border text-secondary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       )}
//       {status === 'success' && (
//         <div>
//           <h1>Blogs</h1>
//           <ul>
//             {blogs.map((blog) => (
//               <BlogItem key={blog.id} blogItem={blog} />
//             ))}
//           </ul>
//           <div>
//             {Array.from({ length: pageCount }).map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => handlePageChange(index + 1)}
//                 disabled={index === currentPage}
//               >
//                 {index + 1}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//       {status === 'error' && <div>Error: {error}</div>}
//     </div>
//   );
// };

// export default BlogList;

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

  const handleAddBlogClick = () => {
    navigate("/add-blog");
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
