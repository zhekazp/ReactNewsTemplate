import React, { FC } from 'react'
import { formatDate, INewsItem } from './newsSlice';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons/faThumbsUp';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';


interface IProps {
    newsItem: INewsItem;
  }

const NewsComponent: FC<IProps> = ({newsItem}) => {


      
  return (
    <NavLink to={`/news/${newsItem.id}`}>
            <img src={newsItem.titleImageSquare} alt={newsItem.title} className='news_img'/>
            <h5>{newsItem.title}</h5>
            <div><span>{formatDate(newsItem.date)}</span>
            <span className='activity_sm_block'><FontAwesomeIcon icon={faThumbsUp} /><span className='activity_counter'>{newsItem.likeCount}</span></span>
            <span  className='activity_sm_block'><FontAwesomeIcon icon={faThumbsDown} /><span className='activity_counter'>{newsItem.dislikeCount}</span></span></div>
        </NavLink>

  )
}

export default NewsComponent
 