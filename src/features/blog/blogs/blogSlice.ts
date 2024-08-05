import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { IAddBlogRequest, IBlog, IBlogsResponse, IUpdateBlogRequest, IRegionDTO, IBlogComment, IBlogCommentRequest, IBlogDetails} from './types';
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


export const addComment = createAsyncThunk(
  'blogs/addComment',
  async (commentData: IBlogCommentRequest, { rejectWithValue }) => {
    try {
      const response = await authorizedFetch(`${API_BASE_URL}/blog/comment`, {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const data = await response.json();
        return rejectWithValue(data.message || 'Failed to add comment');
      }

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: number, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // Получаем токен из localStorage

      const response = await fetch(`${API_BASE_URL}/blog/comment`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Добавляем токен в заголовок
        },
        body: JSON.stringify({ id: commentId }), // Отправляем ID в теле запроса
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return commentId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// export const fetchBlogById = createAsyncThunk(
//   'blogs/fetchBlogById',
//   async (id: number, { rejectWithValue }) => {
//     try {
//       const response = await axios.get<IBlogDetails>(`${API_BASE_URL}/blogs/${id}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

export const fetchBlogById = createAsyncThunk(
  'blogs/fetchBlogById',
  async (id: number, { rejectWithValue }) => {
    try {
      // const token = localStorage.getItem('token') ?? undefined;
      let token = "";
      if(localStorage.getItem('token') && localStorage.getItem('token')!==""){
        token = `Bearer ${token}`;
      }  
      
      const response = await axios.get<IBlogDetails>(`${API_BASE_URL}/blogs/${id}`, {
        headers: {
          'Authorization': token
          // Добавляем заголовок авторизации, только если токен есть
          // Hinzufügen des Autorisierungsheaders, nur wenn ein Token vorhanden ist
          // ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      
      console.log('Full API response:', response);
      console.log('Blog data:', response.data);
      console.log('isPublishedByCurrentUser:', response.data.isPublishedByCurrentUser);
      return response.data;
    } catch (error) {
      console.error('Error in fetchBlogById:', error);
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


export const addBlog = createAsyncThunk(
  'blogs/addBlog',
  async (blogData: IAddBlogRequest, { rejectWithValue }) => {
    try {
      const response = await authorizedFetch(`${API_BASE_URL}/blog`, {
        method: 'POST',
        body: JSON.stringify(blogData),
      });
      return response.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const updateBlog = createAsyncThunk(
  'blogs/updateBlog',
  async (updatedBlogRequest: IUpdateBlogRequest, { rejectWithValue }) => {
    try {
      const response = await authorizedFetch(`${API_BASE_URL}/blog`, {
        method: 'PUT',
        body: JSON.stringify(updatedBlogRequest),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      const updatedBlog = await response.json();
      return updatedBlog;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const deleteBlog = createAsyncThunk(
  'blogs/deleteBlog',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await authorizedFetch(`${API_BASE_URL}/blog`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete blog');
      }
      
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserBlogs = createAsyncThunk(
  'blogs/fetchUserBlogs',
  async ({ page }: { page: number }, { rejectWithValue }) => {
    try {
      const url = `${API_BASE_URL}/blogs/user?page=${page}`;

      const response = await authorizedFetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Не удалось получить блоги пользователя');
      }

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Ошибка при выполнении fetchUserBlogs:', error.message);
      return rejectWithValue(error.message || 'Произошла неизвестная ошибка');
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
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    // Обработка и обновление состояний действия
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
        console.log('Updating state with blog data:', action.payload);
        console.log('isPublishedByCurrentUser in payload:', action.payload.isPublishedByCurrentUser);
        state.status = 'success';
        state.blog = action.payload;
        console.log('Updated state:', state.blog);
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || null;
      })
      .addCase(addComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.status = 'success';
        state.message = 'Comment added successfully';
        // Обновление состояния блога с новым комментарием
        if (state.blog) {
          state.blog.comments.unshift(action.payload as unknown as IBlogComment);
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload as string || 'An error occurred';
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
      .addCase(addBlog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addBlog.fulfilled, (state, action: PayloadAction<IBlog>) => {
        state.status = 'success';
        state.blogs.unshift(action.payload);
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || null;
      })
      .addCase(updateBlog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.status = 'success';
        if (action.payload) {
          // Обновляем блог в состоянии
          state.blog = {
            ...state.blog,
            ...action.payload,
            editedDate: new Date().toISOString()
          };
          // Если блог существует в списке блогов, обновляем его там тоже
          const index = state.blogs.findIndex(blog => blog.id === action.payload.id);
          if (index !== -1) {
            state.blogs[index] = {
              ...state.blogs[index],
              ...action.payload,
              editedDate: new Date().toISOString()
            };
          }
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || null;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBlog.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = 'success';
        // Удаляем блог из списка blogs, если он там есть
        state.blogs = state.blogs.filter(blog => blog.id !== action.payload);
        // Если удаленный блог был текущим отображаемым блогом, очищаем его
        if (state.blog && state.blog.id === action.payload) {
          state.blog = null;
        }
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || null;
      })
      .addCase(fetchUserBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserBlogs.fulfilled, (state, action: PayloadAction<IBlogsResponse>) => {
        state.status = 'success';
        state.blogs = action.payload.blogs;
        state.pageCount = action.payload.pageCount;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchUserBlogs.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || null;
      })
  },
});


export default blogSlice.reducer;