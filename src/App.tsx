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
import Page_404 from "./pages/Page_404";
import CookieConsentModal from "./features/cookie/CookieConsentModal";
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import './style/logInSignUp.css';
import './style/anzeige.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AddBlog from "./features/blog/blogs/AddBlog";
import BlogDetails from "./features/blog/blogs/BlogDetails";
import { fetchBlogs } from "./features/blog/blogs/blogSlice";
import Confirm from "./pages/Confirm";
import Gewinnen from "./pages/Gewinnen";
import Restore from "./pages/Restore";
import AnzeigeList from "./pages/AnzeigeListe";
import AnzeigeDetails from './features/anzeige/AnzeigeDetails';
import AnzeigeAufgeben from './features/anzeige/AnzeigeAufgeben';
import Meins from './features/anzeige/Meins'



function App() {
  const dispatch: AppDispatch = useDispatch();

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
          <Route path="/api/ads" element={<Gewinnen/>} /> 
          <Route path="news" element={<News />} />
          <Route path="news/:id" element={<NewsDetail />} />
          <Route path="blogs" element={<BlogPage />} />
          <Route path="blogs/:id" element={<BlogDetails />} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="advertisement" element={<Advertisement />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="*" element={<Page_404 />} /> {/* Обрабатываем все несуществующие пути */}
          <Route path='/cookie' element={<CookieConsentModal />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/recover" element={<Restore />} />
          <Route path="/" element={<LogIn />} />
          <Route path="/anzeige" element={<AnzeigeList />} />
        <Route path="/anzeige/:id" element={<AnzeigeDetails />} />
        <Route path="/anzeigeAufgeben" element={<AnzeigeAufgeben />} />
        <Route path="/meins" element={<Meins />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
