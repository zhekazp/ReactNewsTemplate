import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faClock, faComment } from "@fortawesome/free-solid-svg-icons";

const Blog = (props) => {
  return (
    <>
      <div className="blog wMainblock">
        <div className="blockWithText">
          <h2 className="infoH2">{props.info.title}</h2>
          <span>
            <span className="nInfo">
              <FontAwesomeIcon icon={faClock} />
              {" " + props.info.publishedDate + " "}
            </span>
            <span className="nInfo">
              <FontAwesomeIcon icon={faEye} />
              {" " + props.info.views + " "}
            </span>
            <span className="nInfo">
              <FontAwesomeIcon icon={faComment} />
              {" " + props.info.comments + " "}
            </span>
          </span>
        </div>
      </div>
    </>
  );
};

export default Blog;
