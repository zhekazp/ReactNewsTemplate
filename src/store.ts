import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./features/news/newsSlice";
import contactUsReducer from "./features/contactUs/contactUsSlice";
import blogReducer from "./features/blog/blogs/blogSlice";
import  topSliceReducer  from "./layout/header/topElSlice";

const store = configureStore({
  reducer: {
    news: newsReducer,
    contactForm: contactUsReducer,
    blogs: blogReducer,
    top: topSliceReducer
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
