// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";

// export interface IUser {
//   userName: string;
//   password: string;
//   emai: string;
//   role: string;
//   state: string;
//   code: string;
// }

// export interface IBlog {
//   id: number;
//   title: string;
//   content: string;
//   author: string;
//   publishedDate?: string;
//   views?: number;
//   comments?: number;
// }

// export interface IComment {
//   id: number;
//   id_blog: number;
//   comment: string;
//   id_author: number;
// }

// export interface IBlogState {
//   blogs: IBlog[];
//   comments: IComment[];
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | undefined;
// }

// const initialState: IBlogState = {
//   blogs: [],
//   comments: [],
//   status: "idle",
//   error: undefined,
// };

// export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
//   const response = await axios.get<IBlog[]>("/api/blog");
//   return response.data;
// });

// export const fetchComments = createAsyncThunk(
//   "blogs/fetchComments",
//   async (id_blog: number) => {
//     const response = await axios.get<IComment[]>(
//       `/api/blog/${id_blog}/comments`
//     );
//     return response.data;
//   }
// );

// const blogsSlice = createSlice({
//   name: "blogs",
//   initialState,
//   reducers: {
//     addBlog: (state, action: PayloadAction<IBlog>) => {
//       state.blogs.push(action.payload);
//     },
//     deleteBlog: (state, action: PayloadAction<number>) => {
//       state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
//     },
//     editBlog: (state, action: PayloadAction<IBlog>) => {
//       const index = state.blogs.findIndex(
//         (blog) => blog.id === action.payload.id
//       );
//       if (index !== -1) {
//         state.blogs[index] = action.payload;
//       }
//     },
//     addComment: (state, action: PayloadAction<IComment>) => {
//       state.comments.push(action.payload);
//     },
//     deleteComment: (state, action: PayloadAction<number>) => {
//       state.comments = state.comments.filter(
//         (comment) => comment.id !== action.payload
//       );
//     },
//     editComment: (state, action: PayloadAction<IComment>) => {
//       const index = state.comments.findIndex(
//         (comment) => comment.id === action.payload.id
//       );
//       if (index !== -1) {
//         state.comments[index] = action.payload;
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchBlogs.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchBlogs.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.blogs = action.payload;
//       })
//       .addCase(fetchBlogs.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       })
//       .addCase(fetchComments.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchComments.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.comments = action.payload;
//       })
//       .addCase(fetchComments.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export const {
//   addBlog,
//   deleteBlog,
//   editBlog,
//   addComment,
//   deleteComment,
//   editComment,
// } = blogsSlice.actions;
// export default blogsSlice.reducer;
