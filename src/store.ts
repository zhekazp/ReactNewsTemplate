import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./features/news/newsSlice";
import contactUsReducer from "./features/contactUs/contactUsSlice";

// import blogReducerTest from "./features/blog/blogsTest/blogSliceTest";
import blogReducer from "./features/blog/blogs/blogSlice";
import  topSliceReducer  from "./layout/header/topElSlice";
import rentReducer from "./features/rent/rentSlice";



// Заглушка редьюсера
const dummyReducer = (state = {}, action: any) => state;

const store = configureStore({
  reducer: {
    dummy: dummyReducer,
    news: newsReducer,
       contactForm: contactUsReducer,
    // blogSliceTest: blogReducerTest,
    blogs: blogReducer,
    top: topSliceReducer,
    rentProducts: rentReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
