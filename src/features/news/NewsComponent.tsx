import React, { FC } from 'react'
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
    <div className='col-4 p-2 newsBlock'>
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

  )
}

export default NewsComponent
