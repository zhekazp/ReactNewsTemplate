import { configureStore } from "@reduxjs/toolkit";
import blogReducerTest from "./features/blog/blogsTest/blogSliceTest";
// import blogReducer from "./features/blog/blogSlice";

// Заглушка редьюсера
const dummyReducer = (state = {}, action: any) => state;

const store = configureStore({
  reducer: {
    dummy: dummyReducer,
    blogSliceTest: blogReducerTest
    // blogs: blogReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
