import React, { FC } from 'react'
import { INewsItem } from './newsSlice';
import { NavLink } from 'react-router-dom';

interface IProps {
    newsItem: INewsItem;
  }

const NewsComponent: FC<IProps> = ({newsItem}) => {


      
  return (
    <NavLink to={`/news/${newsItem.id}`}>
            <img src={newsItem.titleImageSquare} alt={newsItem.title} />
            <h3>{newsItem.title}</h3>
            <p>{newsItem.date}</p>
            {/* <span>{newsItem.likesCounter}</span>
            <span>{newsItem.dislikesCounter}</span> */}
        </NavLink>
    // <div>
    //    <img src={newsItem.titleImageSquare} alt={newsItem.title} />
    //    <h3>{newsItem.title}</h3>
    //    <p>{newsItem.date}</p>
    // </div>

  )
}

export default NewsComponent
    
// import React, { FC } from 'react';
// import { INewsItem } from './newsSlice';
// // import { useDispatch } from "react-redux";

// interface IProps{
//   newsItem: INewsItem;
// }

// const NewsComponent: FC<IProps> = ({newsItem}) => {

//   // const dispatch = useDispatch();

//   return (
//     <div>
//        {/* <img src={newsItem.titleImageSquare} alt={newsItem.title} /> */}
//        <h3>{newsItem.title}</h3>
//        {/* <p>{newsItem.date}</p> */}
//     </div>
//   )
// }

// export default NewsComponent
