import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import NewsInfo from './NewsInfo'
import { regions } from '../../util/elements,jsx'
const News = (props) => {
    const { img, title, regionId } = props.info;
    
    return (
        <div className='picBlock'>
            {props.city? <span className="region">{regions[regionId]}</span>:<></>}
            <img width='100%' src={img}
                alt={title} />
            <div className='nBlock'>
                <h3 className="nTitle">{title}</h3>
                <NewsInfo info={{...props.info}}/>
            </div>
        </div>
    )
}

export default News