import React, { FC, useEffect } from "react";
import { Route, Router, Routes } from "react-router-dom";
import Layout from "./layout/layout";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import Home from "./pages/Home";
import Advertisement from "./pages/Advertisement";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import News from "./pages/News";
import BlogPage from "./pages/BlogPage";
import BlogDetailsTest from "./features/blog/blogsTest/BlogDetailsTest";
import { fetchBlogsTest } from "./features/blog/blogsTest/blogSliceTest";
import Page_404 from "./pages/Page_404";
import CookieConsentModal from "./features/cookie/CookieConsentModal";
// import { fetchBlogs } from "./features/blog/blogSlice";

function App() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogsTest());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="news" element={<News />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path='/blog/:id' element={<BlogDetailsTest />} />
          <Route path="advertisement" element={<Advertisement />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="*" element={<Page_404 />} /> {/* Обрабатываем все несуществующие пути */}
          <Route path='/cookie' element={<CookieConsentModal />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
