import React, { FC, RefObject, useRef } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../../store";
import { deleteBlog, editBlog, IBlogTest } from "./blogSliceTest";
import { NavLink } from "react-router-dom";

interface IProps {
  blog: IBlogTest;
  index: number;
}

const BlogTest: FC<IProps> = ({ blog, index }) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const textRef: RefObject<HTMLTextAreaElement> = useRef(null); // { current: document.getElementById() }'

  const dispatch: AppDispatch = useDispatch();

  const handleDeleteBlog = () => {
    dispatch(deleteBlog(index));
  };

  const handleClickSave = () => {
    if (textRef.current) {
      dispatch(
        editBlog({
          id: index,
          title: textRef.current.value,
          body: textRef.current.value,
          updatedAt: new Date(),
          // authorId
        })
      );
      setIsEdit(false);
    }
  };

  return (
    <div>
      <div className="card">
        {isEdit ? (
          <div>
            <textarea
              ref={textRef}
              defaultValue={blog.title}
              className="form-control mb-2"
            ></textarea>
            <button
              onClick={handleClickSave}
              className="btn btn-success btn-sm me-2"
            >
              Save
            </button>
          </div>
        ) : (
          <div className="card-body">
            <div>
              <NavLink className="user-card-navlink" to={`/blog/${blog.id}`}>
                <div className="">
                  <p className="card-title">{blog.title}</p>
                </div>
              </NavLink>
              <small className="text-muted me-5">
                Updated on: {new Date(blog.updatedAt).toLocaleString()}
              </small>
              {/* <button
              onClick={() => setIsEdit(true)}
              className="btn btn-warning btn-sm me-2"
            >
              Edit
            </button>
            <button onClick={handleDeleteBlog} className="btn btn-danger btn-sm">
              Del
            </button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogTest;
