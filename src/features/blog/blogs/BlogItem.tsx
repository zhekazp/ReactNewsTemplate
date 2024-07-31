import React from "react";
import { NavLink } from "react-router-dom";
import { BlogItemProps } from "./types";
import "./blogsStyles/blogItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faComments,
  faGlobe,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const BlogItem: React.FC<BlogItemProps> = ({ blogItem }) => {
  return (
    <div className="blogItem_container">
      <li className="blogItem-item">
        <h2 className="blogItem-title">{blogItem.title}</h2>
        <div className="blogItem-info_container">
          <p className="blogItem-date">
            <FontAwesomeIcon icon={faCalendar} style={{ marginRight: "8px" }} />
            {blogItem.publishedDate}
          </p>
          {/* <p className="blogItem-views">{blogItem.views} views</p> */}
          <p className="blogItem-comments-info">
            <FontAwesomeIcon icon={faComments} />
            <span className="blogItem-comments-count">{blogItem.comments}</span>
          </p>
          <p className="blogItem-author-region_inner">
            <span className="blog-author-name">
              <FontAwesomeIcon icon={faUser} className="icon" />{" "}
              {blogItem.authorName}
            </span>{" "}
            -
            <span className="blog-region-name">
              <FontAwesomeIcon icon={faGlobe} className="icon" />{" "}
              {blogItem.regionName}
            </span>
          </p>
        </div>
        <div className="blogItem-link_container">
          <NavLink to={`/blogs/${blogItem.id}`} className="blogItem-link">
          Mehr erfahren
          </NavLink>
        </div>
      </li>
    </div>
  );
};

export default BlogItem;
