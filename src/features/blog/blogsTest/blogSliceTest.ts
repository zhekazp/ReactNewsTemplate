import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import axios from "axios";

export interface IBlogFetchTest {
    userId: number;
    id: number;
    title: string;
    body: string;
  }
  
  export interface IBlogTest {
    id: number;
    title: string;
    body: string;
    updatedAt: Date;
  }
  
  export interface ITasksState {
    blogsTest: IBlogTest[];
    status: "loading" | "success" | "error";
  }
  
  const initialState: ITasksState = {
    blogsTest: [],
    status: "loading",
  };

  const sortByDate = (arr: IBlogTest[]) => {
    return arr.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  };

  export const fetchBlogsTest = createAsyncThunk<IBlogTest[], void, { state: RootState }>(
    "blogsTest/fetchBlogsTest",
    async () => {
      const data = (
        await axios.get<IBlogFetchTest[]>(
          "https://jsonplaceholder.typicode.com/posts"
        )
      ).data;
      return sortByDate(
        data.splice(0, 10).map((e: { id: number; title: string; body: string }) => ({
          id: e.id,
          title: e.title,
          body: e.body,
          updatedAt: new Date(
            Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30
          ),
        }))
      );
    }
  );

  const blogSliceTest = createSlice({
    name: "blogTest",
    initialState,
    reducers: {
      addBlog(state, action: PayloadAction<IBlogTest>) {
        state.blogsTest.unshift(action.payload);
      },
      deleteBlog(state, action: PayloadAction<number>) {
        state.blogsTest = state.blogsTest.filter((_, index) => action.payload !== index);
      },
      editBlog(state, action: PayloadAction<IBlogTest>) {
        const index = state.blogsTest.findIndex(blog => blog.id === action.payload.id);
        if (index !== -1) {
          state.blogsTest[index] = action.payload;
          state.blogsTest = sortByDate(state.blogsTest);
        }
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchBlogsTest.pending, (state) => {
          state.status = "loading";
        })
        .addCase(
          fetchBlogsTest.fulfilled,
          (state, action: PayloadAction<IBlogTest[]>) => {
            state.blogsTest = action.payload;
            state.status = "success";
          }
        )
        .addCase(fetchBlogsTest.rejected, (state) => {
          state.status = "error";
        });
    },
  });
  
  export const { addBlog, deleteBlog, editBlog } = blogSliceTest.actions;
  
  export default blogSliceTest.reducer;