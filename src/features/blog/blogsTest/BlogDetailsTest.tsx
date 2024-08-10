import React, { FC, RefObject, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../store";
import { deleteBlog, editBlog} from "./blogSliceTest";

const BlogDetailsTest: FC = () => {
  const { blogsTest } = useSelector((state: RootState) => state.blogSliceTest);
  const { id } = useParams<{ id?: string }>();

  const [isEdit, setIsEdit] = React.useState(false);
  const titleRef: RefObject<HTMLTextAreaElement> = useRef(null);
  const bodyRef: RefObject<HTMLTextAreaElement> = useRef(null);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  // Проверка на undefined и конвертация id в число
  const blogId = id ? parseInt(id, 10) : undefined;
  const currentBlog = blogId !== undefined ? blogsTest.find(blog => blog.id === blogId) : undefined;

  useEffect(() => {
    if (currentBlog === undefined) {
      // Handle case where blog is not found
    }
  }, [currentBlog]);

  const handleDeleteBlog = () => {
    if (currentBlog) {
      dispatch(deleteBlog(currentBlog.id));
      navigate("/blog");
    }
  };

  const handleClickSave = () => {
    if (titleRef.current && bodyRef.current && currentBlog) {
      dispatch(editBlog({
        id: currentBlog.id,
        title: titleRef.current.value,
        body: bodyRef.current.value,
        updatedAt: new Date()
      }));
      setIsEdit(false);
    }
  };

  if (!currentBlog) {
    return <p>Blog not found</p>;
  }

  return (
    <div className="container mt-4">
      {isEdit ? (
        <div className="d-flex flex-column align-items-center">
          <div className="w-75">
            <p>Edit Title: </p>
            <textarea
              ref={titleRef}
              defaultValue={currentBlog.title}
              className="form-control mb-2"
              style={{ minHeight: '50px' }}
            />
            <p>Edit Body: </p>
            <textarea
              ref={bodyRef}
              defaultValue={currentBlog.body}
              className="form-control mb-2"
              style={{ minHeight: '200px' }}
            />
            <button
              onClick={handleClickSave}
              className="btn btn-success btn-sm me-2"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="card mb-3 mx-auto" style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)', maxWidth: '800px' }}>
          <div className="card-body text-center">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <h2 className="text-center mb-4">{currentBlog.title}</h2>
              <p className="text-justify">{currentBlog.body}</p>
              <div className="d-flex justify-content-center mt-3">
                <button
                  onClick={() => setIsEdit(true)}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </button>
                <button
                  onClick={handleDeleteBlog}
                  className="btn btn-danger btn-sm me-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    navigate('/blog');
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetailsTest;