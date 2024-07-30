import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchBlogById,
  addComment,
  updateBlog,
  deleteBlog,
  deleteComment,
} from "./blogSlice";
import { AppDispatch, RootState } from "../../../store";
import { IAddBlogRequestDTO, IBlogDetails, IUpdateBlogRequest } from "./types";
import Breadcrumb from "./Breadcrumb";
import "./blogsStyles/blogDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faGlobe, faComments } from "@fortawesome/free-solid-svg-icons";

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, message } = useSelector(
    (state: RootState) => state.blogs
  );
  const blog: IBlogDetails | null = useSelector(
    (state: RootState) => state.blogs.blog
  );
  const [comment, setComment] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedContent, setEditedContent] = useState<string>("");
  const [titleError, setTitleError] = useState<string | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);
  const [commentError, setCommentError] = useState<string | null>(null);
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [showModalDeleteBlog, setShowModalDeleteBlog] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };

    requestAnimationFrame(scrollToTop);
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(Number(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (blog) {
      setEditedTitle(blog.title);
      setEditedContent(blog.content);
    }
  }, [blog]);

  const handleAddComment = () => {
    if (!comment.trim()) {
      setCommentError("Der Kommentar darf nicht leer sein.");
      return;
    }
    if (id) {
      dispatch(addComment({ blogId: Number(id), comment }));
      setComment("");
      setCommentError(null);
    }
  };

  const handleEdit = (event: React.FormEvent) => {
    event.preventDefault();
    let isValid = true;

    // Проверка длины заголовка
    if (editedTitle.length < 2) {
      setTitleError("Der Titel muss mindestens 2 Zeichen lang sein.");
      isValid = false;
    } else if (editedTitle.length > 200) {
      setTitleError("Der Titel darf höchstens 200 Zeichen lang sein.");
      isValid = false;
    } else {
      setTitleError(null);
    }

    // Проверка контента
    if (!editedContent.trim()) {
      setContentError("Der Inhalt darf nicht leer sein.");
      isValid = false;
    } else {
      setContentError(null);
    }

    if (isValid && editedTitle && editedContent && blog) {
      const updatedBlogData: IAddBlogRequestDTO = {
        title: editedTitle,
        content: editedContent,
        region: blog.regionId,
      };
      const updatedBlogRequest: IUpdateBlogRequest = {
        id: Number(id),
        blogAddRequestDTO: updatedBlogData,
      };
      dispatch(updateBlog(updatedBlogRequest));
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (id) {
        await dispatch(deleteBlog(Number(id))).unwrap();
        setDeleteSuccess(true);
        setShowModalDeleteBlog(true);
      }
    } catch (error) {
      console.error("Failed to delete the blog:", error);
      alert("Failed to delete the blog");
    }
  };

  const handleModalClose = () => {
    setShowModalDeleteBlog(false);
    navigate("/blogs");
  };

  const handleDeleteComment = (commentId: number) => {
    dispatch(deleteComment(commentId));
  };

  //   return (
  //     <div>
  //       {status === "loading" && <div>Loading...</div>}
  //       {status === "error" && <div>{error}</div>}
  //       {status === "success" && message && <div className="success">{message}</div>}
  //       <Breadcrumb />
  //       {blog ? (
  //         <>
  //           {isEditing ? (
  //             <form onSubmit={handleEdit}>
  //               <div>
  //                 <label>Title:</label>
  //                 <input
  //                   value={editedTitle}
  //                   onChange={(e) => setEditedTitle(e.target.value)}
  //                 />
  //                 {titleError && <p className="error">{titleError}</p>}
  //               </div>
  //               <div>
  //                 <label>Content:</label>
  //                 <textarea
  //                   value={editedContent}
  //                   onChange={(e) => setEditedContent(e.target.value)}
  //                 />
  //                 {contentError && <p className="error">{contentError}</p>}
  //               </div>
  //               <button type="submit">Save</button>
  //               <button onClick={() => setIsEditing(false)}>Cancel</button>
  //             </form>
  //           ) : (
  //             <>
  //               <h2>{blog.title}</h2>
  //               <p>{blog.publishedDate}</p>
  //               <p>{blog.views} views</p>
  //               <p>{blog.content}</p>
  //               <p>{blog.authorName} - {blog.regionName}</p>
  //             </>
  //           )}
  //           {currentUser.id === blog.authorId && !isEditing && (
  //             <div>
  //               <button onClick={() => setIsEditing(true)}>Edit</button>
  //               <button onClick={handleDelete}>Delete</button>
  //               {showModalDeleteBlog && deleteSuccess && (
  //                 <div className="modal">
  //                   <div className="modal-content">
  //                     <h2>Blog gelöscht</h2>
  //                     <p>Der Blog wurde erfolgreich gelöscht.</p>
  //                     <button onClick={handleModalClose}>OK</button>
  //                   </div>
  //                 </div>
  //               )}
  //             </div>
  //           )}
  //           <h3>Comments</h3>
  //           <p>{blog.comments.length} comments</p>
  //           {blog.comments.length > 0 ? (
  //             blog.comments.map((comment) => (
  //               <div key={comment.id}>
  //                 <p>{comment.comment}</p>
  //                 <p>By: {comment.authorName} on {comment.commentDate}</p>
  //                 {comment.isPublishedByCurrentUser && (
  //                   <button onClick={() => handleDeleteComment(comment.id)}>Delete Comment</button>
  //                 )}
  //               </div>
  //             ))
  //           ) : (
  //             <p>No comments yet</p>
  //           )}
  //           <div>
  //             <h3>Add a Comment</h3>
  //             <textarea
  //               value={comment}
  //               onChange={(e) => setComment(e.target.value)}
  //             />
  //             {commentError && <p className="error">{commentError}</p>}
  //             <button onClick={handleAddComment}>Add Comment</button>
  //           </div>
  //         </>
  //       ) : (
  //         <div>No blog found</div>
  //       )}
  //     </div>
  //   );
  // };

  return (
    <div className="blog-details-container">
      <Breadcrumb />
      {blog ? (
        <>
          {isEditing ? (
            <form onSubmit={handleEdit} className="edit-blog-form">
              <div>
                <label>Title:</label>
                <input
                  className="edit-blog-form_input"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                {titleError && <p className="error">{titleError}</p>}
              </div>
              <div>
                <label>Content:</label>
                <textarea
                  className="edit-blog-form_textarea"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                {contentError && <p className="error">{contentError}</p>}
              </div>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </form>
          ) : (
            <div className="blog-container_inner">
              <h2 className="blog-title_inner">{blog.title}</h2>
              <p className="blog-publishedDate_inner">{blog.publishedDate}</p>
              {/* <p className="">{blog.views} views</p> */}
              <p className="blog-content_inner">{blog.content}</p>
              <p className="blog-author-region_inner">
                <span className="blog-author-name">
                  <FontAwesomeIcon icon={faUser} className="icon" />{" "}
                  {blog.authorName}
                </span>{" "}
                -
                <span className="blog-region-name">
                  <FontAwesomeIcon icon={faGlobe} className="icon" />{" "}
                  {blog.regionName}
                </span>
              </p>
            </div>
          )}
          {currentUser.id === blog.authorId && !isEditing && (
            <div>
              <div className="button-container_edit_del">
                <button
                  className="edit-blog_button"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
                <button className="delete-blog_button" onClick={handleDelete}>
                  Delete
                </button>
              </div>
              {showModalDeleteBlog && deleteSuccess && (
                <div className="modal">
                  <div className="modal-content">
                    <h2>Blog gelöscht</h2>
                    <p>Der Blog wurde erfolgreich gelöscht.</p>
                    <button onClick={handleModalClose}>OK</button>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="comments-section">
            <div className="comments-header">
              <p className="comments-info">
                <FontAwesomeIcon icon={faComments} />
                <span className="comments-count">{blog.comments.length}</span>
              </p>
            </div>
            {blog.comments.length > 0 ? (
              blog.comments.map((comment) => (
                <div key={comment.id} className="blog_comment">
                  <p>{comment.comment}</p>
                  <p>
                    By: {comment.authorName} on {comment.commentDate}
                  </p>
                  {comment.isPublishedByCurrentUser && (
                    <button
                      className="blog_comment_button"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Delete Comment
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p>No comments yet</p>
            )}
            <div className="add-comment-section">
              <h3>Add a Comment</h3>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              {commentError && <p className="error">{commentError}</p>}
              <button onClick={handleAddComment}>Add Comment</button>
            </div>
            {status === "loading" && (
              <div className="status-message loading">Loading...</div>
            )}
            {status === "error" && (
              <div className="status-message error">{error}</div>
            )}
            {status === "success" && message && (
              <div className="status-message success">{message}</div>
            )}
          </div>
        </>
      ) : (
        <div>No blog found</div>
      )}
    </div>
  );
};

export default BlogDetails;
