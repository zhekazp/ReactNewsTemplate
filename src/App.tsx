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
import "./style/main.css";
import NewsDetail from "./pages/NewsDetail";
import BlogPage from "./pages/BlogPage";
// import './features/blog/blogs/breadcrumb.css';
import Page_404 from "./pages/Page_404";
import CookieConsentModal from "./features/cookie/CookieConsentModal";
// logInSignUp
// import { fetchBlogs } from "./features/blog/blogSlice";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import "./style/logInSignUp.css";
import "bootstrap/dist/css/bootstrap.min.css";

import AddBlog from "./features/blog/blogs/AddBlog";
import BlogDetails from "./features/blog/blogs/BlogDetails";
import { fetchBlogs } from "./features/blog/blogs/blogSlice";
import AdminPanel from "./pages/AdminPanel";
import UserManagement from "./features/admin/users/UserManagement";
import NewsManagement from "./features/admin/adminNews/NewsManagement";
import BlogManagement from "./features/admin/adminBlogs/BlogManagement";
import AdsManagement from "./features/admin/AdsManagement";

function App() {
  const dispatch: AppDispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchBlogs({ page: 0, region: 0 }));
  // }, [dispatch]);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "0", 10);
    const region = parseInt(searchParams.get("region") || "0", 10);
    dispatch(fetchBlogs({ page, region }));
  }, [dispatch, searchParams]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="/api/ads" element={<Gewinnen />} /> */}
          <Route path="news" element={<News />} />
          <Route path="news/:id" element={<NewsDetail />} />
          <Route path="blogs" element={<BlogPage />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="advertisement" element={<Advertisement />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="*" element={<Page_404 />} />{" "}
          {/* Обрабатываем все несуществующие пути */}
          <Route path="/cookie" element={<CookieConsentModal />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<LogIn />} />
        </Route>

        <Route path="admin" element={<AdminPanel />}>
          <Route path="users" element={<UserManagement />} />
          <Route path="news" element={<NewsManagement />} />
          <Route path="blogs" element={<BlogManagement />} />
          <Route path="ads" element={<AdsManagement />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
