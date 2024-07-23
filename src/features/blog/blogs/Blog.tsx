// import React from "react";

// import { IBlog, IUser } from "./blogSlice";

// interface BlogProps {
//   blog: IBlog;
//   currentUser: IUser | null;
//   onDelete: (id: number) => void;
// }

// const Blog: React.FC<BlogProps> = ({ blog, currentUser, onDelete }) => {
//   return (
//     <div className="card mb-3">
//       <div className="card-body">
//         <h5 className="card-title">{blog.title}</h5>
//         <p className="card-text">{blog.content}</p>
//         {currentUser && blog.author === currentUser.userName && (
//           <button onClick={() => onDelete(blog.id)} className="btn btn-danger">Delete</button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Blog;