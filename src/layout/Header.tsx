import React from 'react';
import TopElement from './header/TopElement';
import Navigation from './header/Navigation';
import { news } from '../config/news';


const Header = () => {
  return (
    <>
            <TopElement news={[news[0].title, news[1].title,
                news[2].title, news[3].title
            ]}/>
            <Navigation/>
        </>
  )
}

export default Header;