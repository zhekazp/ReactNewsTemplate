// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteBlog, fetchBlogs, IUser } from "./blogSlice";
// import Blog from "./Blog";
// import { RootState, AppDispatch } from "../../store";

// interface BlogListProps {
//   currentUser: IUser | null;
// }

// const BlogList: React.FC<BlogListProps> = ({ currentUser }) => {
//   const dispatch: AppDispatch = useDispatch();
//   const { blogs, status, error } = useSelector((state: RootState) => state.blogs);

//   useEffect(() => {
//     dispatch(fetchBlogs());
//   }, [dispatch]);

//   const handleDelete = (id: number) => {
//     if (currentUser && blogs.find(blog => blog.id === id)?.author === currentUser.userName) {
//       dispatch(deleteBlog(id));
//     } else {
//       alert("You can only delete your own blogs");
//     }
//   };

//   return (
//     <div>
//       <h1>Blogs</h1>
//       {status === "loading" && <p>Loading...</p>}
//       {status === "failed" && <p>{error}</p>}
//       {status === "succeeded" && blogs.map(blog => (
//         <Blog key={blog.id} blog={blog} currentUser={currentUser} onDelete={handleDelete} />
//       ))}
//     </div>
//   );
// };

// export default BlogList;