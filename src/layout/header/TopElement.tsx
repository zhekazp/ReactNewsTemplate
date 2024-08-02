import React, { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import RunLine from './Runline';
import LogIn from '../../pages/LogIn';

// Define the props type
export interface TopElementProps {
  news: string[];
}

const TopElement: FC<TopElementProps> = (props) => {
  return (
    <div className="topBlock">
      <div className="container">
        <div className="d-flex justify-content-between">
          <div className="left-content">
            <div className="topText">
              <span className="topTitle">actuelle</span>
              <RunLine news={props.news} />
            </div>
          </div>
          <div className="right-content d-flex align-self-center">
            <span>
              <span className="login">
                <FontAwesomeIcon icon={faUserCircle} />
              </span>
              <a href="/login">LogIn/Registration</a>
              </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopElement;