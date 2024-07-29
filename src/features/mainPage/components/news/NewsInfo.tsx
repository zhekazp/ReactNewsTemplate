import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faThumbsUp,  faThumbsDown} from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import { NewsMP } from '../../mainPage';

const NewsInfo = (props:{info: NewsMP}) => {
    const {date, likeCount, dislikeCount}=props.info;
  return (
    <span className='nInfo'>
                    <FontAwesomeIcon icon={faClock} />
                    <span className='nIco'>
                        {" " +  date}
                    </span>
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <span className='nIco'>
                        {" " + likeCount}
                    </span>
                    <FontAwesomeIcon icon={faThumbsDown} />
                    <span className='nIco'>
                        {" "+ dislikeCount}
                    </span>
                </span>
  )
}

export default NewsInfo