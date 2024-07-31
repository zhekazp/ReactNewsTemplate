import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEuroSign, faLocationDot} from '@fortawesome/free-solid-svg-icons'

const ViewInfo = (props: {smallInfo:{price: number; region: string}}) => {
    const {price, region}=props.smallInfo;
  return (
    <span>
                    
                    <span className='nInfo'>
                    <FontAwesomeIcon icon={faEuroSign} />
                        {" " + price+" "}
                    </span>
                    
                    <span className='nInfo'>
                    <FontAwesomeIcon icon={faLocationDot} />
                        {" "+ region}
                    </span>
                </span>
  )
}

export default ViewInfo