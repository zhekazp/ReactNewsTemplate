import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IAddBlogRequest, IBlog, IBlogsResponse, IUpdateBlogRequest, IRegionDTO, IBlogComment, IBlogCommentRequest, IBlogDetails, AddBlogResponse, AddBlogError} from './types';
import authorizedFetch from './authorizedFetch';

export const API_BASE_URL = '/api';

// Асинхронные экшены
export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async ({ page, region }: { page: number; region: number }) => {
    try {
      const response = await axios.get<IBlogsResponse>(`${API_BASE_URL}/blogs`, {
        params: { page, region },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);


// export const addComment = createAsyncThunk(
//   'blogs/addComment',
//   async (commentData: IBlogCommentRequest, { rejectWithValue }) => {
//     try {
//       const response = await authorizedFetch(`${API_BASE_URL}/blog/comment`, {
//         method: 'PUT',
//         body: JSON.stringify(commentData),
//       });
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const addComment = createAsyncThunk<
  { message: string; comment?: IBlogComment },
  IBlogCommentRequest,
  { rejectValue: { message: string } }
>(
  'blogs/addComment',
  async (commentData, { rejectWithValue }) => {
    try {
      const response = await authorizedFetch(`${API_BASE_URL}/blog/comment`, {
        method: 'PUT',
        body: JSON.stringify(commentData),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue({ message: data.message || 'Failed to add comment' });
      }
      return data;
    } catch (error: any) {
      return rejectWithValue({ message: error.message });
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number, { rejectWithValue }) => {
    try {
      const response = await authorizedFetch(`${API_BASE_URL}/blog/comment/${commentId}`, {
        method: 'DELETE',
      });
      return commentId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBlogById = createAsyncThunk(
  'blogs/fetchBlogById',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get<IBlogDetails>(`${API_BASE_URL}/blogs/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const fetchRegions = createAsyncThunk(
  'regions/fetchRegions',
  async () => {
    try {
      const response = await axios.get<IRegionDTO[]>(`${API_BASE_URL}/regions`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Без валидации:

// export const addBlog = createAsyncThunk(
//   'blogs/addBlog',
//   async (blogData: IAddBlogRequest, { rejectWithValue }) => {
//     try {
//       const response = await authorizedFetch(`${API_BASE_URL}/blog`, {
//         method: 'PUT',
//         body: JSON.stringify(blogData),
//       });
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const addBlog = createAsyncThunk<
  AddBlogResponse,
  IAddBlogRequest,
  { rejectValue: AddBlogError }
>(
  'blogs/addBlog',
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await authorizedFetch(`${API_BASE_URL}/blog`, {
        method: 'PUT',
        body: JSON.stringify(blogData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue({ message: data.message || 'Failed to add blog' });
      }
      return data;
    } catch (error: any) {
      return rejectWithValue({ message: error.message });
    }
  }
);

// export const updateBlog = createAsyncThunk(
//   'blogs/updateBlog',
//   async ({ id, blogAddRequestDTO }: IUpdateBlogRequest, { rejectWithValue }) => {
//     try {
//       const response = await authorizedFetch(`${API_BASE_URL}/blog`, {
//         method: 'POST',
//         body: JSON.stringify({
//           id,
//           blogAddRequestDTO
//         }),
//       });
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const updateBlog = createAsyncThunk<
  { message: string },
  IUpdateBlogRequest,
  { rejectValue: { message: string } }
>(
  'blogs/updateBlog',
  async ({ id, blogAddRequestDTO }, { rejectWithValue }) => {
    try {
      const response = await authorizedFetch(`${API_BASE_URL}/blog`, {
        method: 'POST',
        body: JSON.stringify({ id, blogAddRequestDTO }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue({ message: data.message || 'Failed to update blog' });
      }
      return data;
    } catch (error: any) {
      return rejectWithValue({ message: error.message });
    }
  }
);

export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await authorizedFetch(`${API_BASE_URL}/blog/${id}`, {
        method: 'DELETE',
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

interface BlogsState {
  blogs: IBlog[];
  blog: IBlogDetails | null;
  regions: IRegionDTO[];
  status: 'loading' | 'success' | 'error' | 'idle';
  error: string | null;
  pageCount: number;
  currentPage: number;
  message: string | null;
}

const initialState: BlogsState = {
  blogs: [],
  blog: null,
  regions: [],
  status: 'idle',
  error: null,
  pageCount: 0,
  currentPage: 0,
  message: null,
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogs.fulfilled, (state, action: PayloadAction<IBlogsResponse>) => {
        state.status = 'success';
        state.blogs = action.payload.blogs;
        state.pageCount = action.payload.pageCount;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || null;
      })
      .addCase(fetchBlogById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogById.fulfilled, (state, action: PayloadAction<IBlogDetails>) => {
        state.status = 'success';
        state.blog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || null;
      })
      // .addCase(addComment.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(addComment.fulfilled, (state, action: PayloadAction<IBlogComment>) => {
      //   state.status = 'success';
      //   if (state.blog) {
      //     state.blog.comments.unshift(action.payload);
      //   }
      // })
      // .addCase(addComment.rejected, (state, action) => {
      //   state.status = 'error';
      //   state.error = action.error.message || null;
      // })
      .addCase(addComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = 'success';
        state.message = action.payload.message;
        if (action.payload.comment && state.blog) {
          state.blog.comments.unshift(action.payload.comment);
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload?.message || 'An error occurred';
      })
      .addCase(deleteComment.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = 'success';
        // Удаление комментария из состояния
        if (state.blog) {
          state.blog.comments = state.blog.comments.filter(comment => comment.id !== action.payload);
        }
      })
      .addCase(fetchRegions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRegions.fulfilled, (state, action: PayloadAction<IRegionDTO[]>) => {
        state.status = 'success';
        state.regions = action.payload;
      })
      .addCase(fetchRegions.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || null;
      })
      // .addCase(addBlog.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(addBlog.fulfilled, (state, action: PayloadAction<IBlog>) => {
      //   state.status = 'success';
      //   state.blogs.unshift(action.payload);
      // })
      // .addCase(addBlog.rejected, (state, action) => {
      //   state.status = 'error';
      //   state.error = action.error.message || null;
      // })
      .addCase(addBlog.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.message = null;
      })
      .addCase(addBlog.fulfilled, (state, action: PayloadAction<AddBlogResponse>) => {
        state.status = 'success';
        if (action.payload.blog) {
          state.blogs.unshift(action.payload.blog);
        }
        state.message = action.payload.message;
      })
      .addCase(addBlog.rejected, (state, action: PayloadAction<AddBlogError | undefined>) => {
        state.status = 'error';
        state.error = action.payload?.message || 'An error occurred';
      })
      // .addCase(updateBlog.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(updateBlog.fulfilled, (state, action) => {
      //   state.status = 'success';
      //   if (action.payload.message === "Blog update successfully") {
      //     // Найдите и обновите блог в состоянии
      //     if (state.blog) {
      //       state.blog.editedDate = new Date().toISOString();
      //     }
      //   }
      // })
      // .addCase(updateBlog.rejected, (state, action) => {
      //   state.status = 'error';
      //   state.error = action.error.message || null;
      // })
      .addCase(updateBlog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.status = 'success';
        state.message = action.payload.message;
        if (action.payload.message === "Blog update successfully" && state.blog) {
          state.blog.editedDate = new Date().toISOString();
          state.blog.title = action.meta.arg.blogAddRequestDTO.title;
          state.blog.content = action.meta.arg.blogAddRequestDTO.content;
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload?.message || 'An error occurred';
      })
      .addCase(deleteBlog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBlog.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || null;
      })
  },
});

export default blogSlice.reducer;