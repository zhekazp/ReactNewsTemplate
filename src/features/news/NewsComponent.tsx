import React, { FC } from 'react'
<<<<<<< HEAD
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
=======
import { formatDate } from './newsSlice';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons/faThumbsUp';
import { faClock, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { INewsItem } from './newsTypes';


interface IProps {
  newsItem: INewsItem;
}
const NewsComponent: FC<IProps> = ({ newsItem }) => {

  const displayRegionName = newsItem.regionName === 'non-region' ? 'Alle Bundesländer' : newsItem.regionName;

  return (
    <div className='col-md-4 col-sm-6 p-2 newsBlock'>
      <NavLink to={`/news/${newsItem.id}`} className='picBlock'>
        <span className='pick-block'>{displayRegionName}</span>
        <img width='100%' src={newsItem.titleImageSquare} alt={newsItem.title} className='news-img' />
        <div className='nBlock'>
          <h5 className='newsBlock-title nTitle'>{newsItem.title}</h5>
          <div className='newsBlock_info'>
            <span> <FontAwesomeIcon icon={faClock} /> {formatDate(newsItem.date)}</span>
            <span className='activity_sm_block'><FontAwesomeIcon icon={faThumbsUp} /><span className='activity_counter'> {newsItem.likeCount}</span>
            </span>
            <span className='activity_sm_block'><FontAwesomeIcon icon={faThumbsDown} /><span className='activity_counter'> {newsItem.dislikeCount}</span>
            </span>
          </div>
        </div>
      </NavLink>
    </div>
>>>>>>> 161292b5d4fbb932f5678b4924c3aa9712feb9db

  )
}

export default NewsComponent
<<<<<<< HEAD
 
=======
>>>>>>> 161292b5d4fbb932f5678b4924c3aa9712feb9db
