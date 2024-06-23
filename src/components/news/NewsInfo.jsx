import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'

const NewsInfo = (props) => {
    const {data, comments, views}=props.info;
  return (
    <span className='nInfo'>
                    <FontAwesomeIcon icon={faClock} />
                    <span className='nIco'>
                        {" " + data}
                    </span>
                    <FontAwesomeIcon icon={faEye} />
                    <span className='nIco'>
                        {" " + views}
                    </span>
                    <FontAwesomeIcon icon={faComment} />
                    <span className='nIco'>
                        {" "+ comments}
                    </span>
                </span>
  )
}

export default NewsInfo