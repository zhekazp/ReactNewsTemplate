import React, { FC, useEffect } from "react";
import { Route, Router, Routes, useSearchParams } from "react-router-dom";
import Layout from "./layout/layout";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import Home from "./pages/Home";
import Advertisement from "./pages/Advertisement";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import News from "./pages/News";
import './style/main.css'
import NewsDetail from "./pages/NewsDetail";
import BlogPage from "./pages/BlogPage";
// import './features/blog/blogs/breadcrumb.css';
import Page_404 from "./pages/Page_404";
import CookieConsentModal from "./features/cookie/CookieConsentModal";
import AddBlog from "./features/blog/blogs/AddBlog";
import BlogDetails from "./features/blog/blogs/BlogDetails";
import { fetchBlogs } from "./features/blog/blogs/blogSlice";

function App() {
  const dispatch: AppDispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchBlogs({ page: 0, region: 0 }));
  // }, [dispatch]);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '0', 10);
    const region = parseInt(searchParams.get('region') || '0', 10);
    dispatch(fetchBlogs({ page, region }));
  }, [dispatch, searchParams]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="news" element={<News />} />
          <Route path="blogs" element={<BlogPage />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/add-blog" element={<AddBlog />} />
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
