import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./features/news/newsSlice";
import contactUsReducer from "./features/contactUs/contactUsSlice";
import blogReducer from "./features/blog/blogs/blogSlice";
import  topSliceReducer  from "./layout/header/topElSlice";
import rentReducer from "./features/anzeige/rentSlice";



const store = configureStore({
  reducer: {
    news: newsReducer,
    contactForm: contactUsReducer,
    blogs: blogReducer,
    top: topSliceReducer,
    rentProducts: rentReducer,

  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
