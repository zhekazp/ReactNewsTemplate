
import { NewsMP } from '../../mainPage';
import NewsInfo from './NewsInfo'
import React from 'react';
const News = (props: {info:NewsMP; city:boolean}) => {
    const {
        titleImageSquare, title, regionName } = props.info;

    return (
        <div className='picBlock'>
            {props.city ? <span className="region">{regionName}</span> : <></>}
            <img width='100%' src={
                titleImageSquare
            }
                alt={title} />
            <div className='nBlock'>
                <h3 className="nTitle">{title}</h3>
                <NewsInfo info={{ ...props.info }} />
            </div>
        </div>
    )
}

export default News