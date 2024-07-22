import React, { FC, useEffect } from "react";
import { Route, Router, Routes } from "react-router-dom";
import Layout from "./layout/layout";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Advertisement from "./pages/Advertisement";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import News from "./pages/News";


function App() {


    const dispatch: AppDispatch = useDispatch();

    useEffect(() =>{

    }, [dispatch])


    return (
        <>
            
            <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="news" element={<News />} />
                <Route path="blog" element={<Blog />} />
                <Route path="advertisement" element={<Advertisement />} />
                <Route path="about" element={<AboutUs />} />
                <Route path="contact" element={<ContactUs />} />
                </Route>
            </Routes>
        </>
    )
}

export default App;