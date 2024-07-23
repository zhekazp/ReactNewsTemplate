// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addBlog, IBlog, IUser } from "./blogSlice";

// interface NewBlogFormProps {
//   currentUser: IUser;
// }

// const NewBlogForm: React.FC<NewBlogFormProps> = ({ currentUser }) => {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const dispatch = useDispatch();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (title && content) {
//       const newBlog: IBlog = {
//         id: Date.now(),
//         title,
//         content,
//         author: currentUser.userName
//       };
//       dispatch(addBlog(newBlog));
//       setTitle("");
//       setContent("");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Title</label>
//         <input 
//           type="text" 
//           value={title} 
//           onChange={(e) => setTitle(e.target.value)} 
//         />
//       </div>
//       <div>
//         <label>Content</label>
//         <textarea 
//           value={content} 
//           onChange={(e) => setContent(e.target.value)}
//         />
//       </div>
//       <button type="submit">Add Blog</button>
//     </form>
//   );
// };

// export default NewBlogForm;