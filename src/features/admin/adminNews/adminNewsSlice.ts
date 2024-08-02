import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { INewsItem, IComment } from "../../news/newsSlice";


interface AdminNewsState {
  news: INewsItem[];
  comments: Record<number, IComment[]>;
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
}

const initialState: AdminNewsState = {
  news: [],
  comments: {},
  status: "idle",
  error: null,
};

export const fetchAdminNews = createAsyncThunk(
  "adminNews/fetchNews",
  async () => {
    const response = await axios.get<INewsItem[]>("/api/admin/news");
    return response.data;
  }
);

export const fetchCommentsByNewsId = createAsyncThunk(
  "adminNews/fetchComments",
  async (newsId: number) => {
    const response = await axios.get<IComment[]>(
      `/api/news/${newsId}/comments`
    );
    return { newsId, comments: response.data };
  }
);

export const deleteNewsItem = createAsyncThunk(
  "adminNews/deleteNews",
  async (newsId: number) => {
    await axios.delete(`/api/admin/news/${newsId}`);
    return newsId;
  }
);

const adminNewsSlice = createSlice({
  name: "adminNews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdminNews.fulfilled, (state, action) => {
        state.status = "success";
        state.news = action.payload;
      })
      .addCase(fetchAdminNews.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message || "Failed to fetch news";
      })
      .addCase(fetchCommentsByNewsId.fulfilled, (state, action) => {
        state.comments[action.payload.newsId] = action.payload.comments;
      })
      .addCase(deleteNewsItem.fulfilled, (state, action) => {
        state.news = state.news.filter(
          (newsItem) => newsItem.id !== action.payload
        );
      });
  },
});

export default adminNewsSlice.reducer;
