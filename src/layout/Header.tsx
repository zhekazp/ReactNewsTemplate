import React from 'react';
import TopElement from './header/TopElement';
import Navigation from './header/Navigation';
import { news } from '../config/news';


const Header = () => {
  return (
    <>
            <TopElement />
            <Navigation/>
        </>
  )
}

export default Header;