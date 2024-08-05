import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchBlogById,
  addComment,
  updateBlog,
  deleteBlog,
  deleteComment,
  fetchRegions,
} from "./blogSlice";
import { AppDispatch, RootState } from "../../../store";
import { IBlogDetails, IUpdateBlogRequest } from "./types";
import Breadcrumb from "./Breadcrumb";
import "./blogsStyles/blogDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGlobe,
  faComments,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { topSlice } from "../../../layout/header/topElSlice";
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
  const [showModalDeleteBlog, setShowModalDeleteBlog] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [showModalUpdateSuccess, setShowModalUpdateSuccess] = useState(false);
  const [showModalAddComment, setShowModalAddComment] = useState(false);
  const [showModalDeleteComment, setShowModalDeleteComment] = useState(false);
  const [updateTrigger, setUpdateTrigger] = useState(0); // Перерендер компонента

  const currentUserString = localStorage.getItem("user");
  const currentUser = currentUserString ? JSON.parse(currentUserString) : null;
  const token = currentUser ? currentUser.token : null;
  // console.log(currentUser);

  useEffect(() => {
    if (blog) {
      console.log("Blog details:", blog);
      console.log("isPublishedByCurrentUser:", blog.isPublishedByCurrentUser);
    }
  }, [blog]);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };
    dispatch(topSlice.actions.setCurrentPage(1))
    requestAnimationFrame(scrollToTop);
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(fetchBlogById(Number(id)));
    }
  }, [dispatch, id, updateTrigger]);

  useEffect(() => {
    if (blog) {
      setEditedTitle(blog.title);
      setEditedContent(blog.content);
    }
  }, [blog]);


  const handleAddComment = async () => {
    if (!comment.trim()) {
      setCommentError("Der Kommentar darf nicht leer sein.");
      return;
    }
    if (id) {
      try {
        await dispatch(addComment({ blogId: Number(id), comment })).unwrap();
        setComment("");
        setCommentError(null);
        setShowModalAddComment(true);
        setUpdateTrigger((prev) => prev + 1);
      } catch (error) {
        console.error("Fehler beim Hinzufügen des Kommentars:", error);
      }
    }
  };

  const regions = useSelector((state: RootState) => state.blogs.regions);

  useEffect(() => {
    if (regions.length === 0) {
      dispatch(fetchRegions());
    }
  }, [dispatch, regions]);

  const handleEdit = (event: React.FormEvent) => {
    event.preventDefault();
    let isValid = true;

    if (!id || isNaN(Number(id))) {
      console.error("Ungültige Blog-ID");
      return;
    }

    // Валидация заголовка и содержания
    if (editedTitle.length < 2) {
      setTitleError("Der Titel muss mindestens 2 Zeichen lang sein.");
      isValid = false;
    } else if (editedTitle.length > 200) {
      setTitleError("Der Titel darf höchstens 200 Zeichen lang sein.");
      isValid = false;
    } else {
      setTitleError(null);
    }

    if (!editedContent.trim()) {
      setContentError("Der Inhalt darf nicht leer sein.");
      isValid = false;
    } else {
      setContentError(null);
    }

    if (isValid && blog) {
      const region = regions.find((r) => r.regionName === blog.regionName);
      if (!region) {
        console.error("Region nicht gefunden");
        return;
      }

      const updatedBlogRequest: IUpdateBlogRequest = {
        id: Number(id),
        blogAddRequestDTO: {
          title: editedTitle,
          content: editedContent,
          region: region.id,
        },
      };

      dispatch(updateBlog(updatedBlogRequest))
        .unwrap()
        .then((updatedBlog) => {
          setIsEditing(false);
          setShowModalUpdateSuccess(true);
          setUpdateTrigger((prev) => prev + 1); // Это вызовет перерендер компонента
        })
        .catch((error) => {
          console.error("Fehler beim Aktualisieren des Blogs:", error.message || error);
        });
    }
  };

  const handleDelete = async () => {
    if (!id) {
      console.error("Löschen nicht möglich: Blog-ID ist null oder undefined");
      return;
    }

    try {
      console.log("Versuche, Blog mit ID zu löschen:", id);
      const numericId = Number(id);
      if (isNaN(numericId)) {
        console.error("Ungültige Blog-ID");
        return;
      }

      await dispatch(deleteBlog(numericId)).unwrap();
      setDeleteSuccess(true);
      setShowModalDeleteBlog(true);
    } catch (error) {
      console.error("Fehler beim Löschen des Blogs:", error);
    }
  };

  const handleModalClose = () => {
    setShowModalDeleteBlog(false);
    navigate("/blogs");
  };


  const handleDeleteComment = async (commentId: number) => {
    try {
      await dispatch(deleteComment(commentId)).unwrap();
      setShowModalDeleteComment(true);
      setUpdateTrigger((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <div className="blog-details-container">
      <Breadcrumb />
      {blog ? (
        <>
          {isEditing ? (
            <form onSubmit={handleEdit} className="edit-blog-form">
              <div>
                <label>Titel:</label>
                <input
                  className="edit-blog-form_input"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                {titleError && <p className="error">{titleError}</p>}
              </div>
              <div>
                <label>Inhalt:</label>
                <textarea
                  className="edit-blog-form_textarea"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                {contentError && <p className="error">{contentError}</p>}
              </div>
              <div className="button-container_edit_del">
                <button className="edit-blog-form_button" type="submit">
                  Speichern
                </button>
                <button
                  className="delete-blog-form_button"
                  type="button"
                  onClick={() => setIsEditing(false)}
                >
                  Abbrechen
                </button>
              </div>
            </form>
          ) : (
            <div className="blog-container_inner">
              <h2 className="blog-title_inner">{blog.title}</h2>
              <p className="blogItem-date">
                <FontAwesomeIcon
                  icon={faCalendar}
                  style={{ marginRight: "8px" }}
                />
                {blog.publishedDate}
              </p>
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
          {console.log("Current User:", currentUser.email)}
          {console.log("Current User:", token)}
          {console.log("Blog Author:", blog.authorName)}
          {blog && blog.isPublishedByCurrentUser && !isEditing && (
            <div>
              <div className="button-container_edit_del">
                <button
                  className="edit-blog_button"
                  onClick={() => setIsEditing(true)}
                >
                  Bearbeiten
                </button>
                <button className="delete-blog_button" onClick={handleDelete}>
                  Löschen
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
              {showModalUpdateSuccess && (
                <div className="modal">
                  <div className="modal-content">
                    <h2>Blog aktualisiert</h2>
                    <p>Der Blog wurde erfolgreich aktualisiert.</p>
                    <button
                      onClick={() => {
                        setShowModalUpdateSuccess(false);
                        navigate(`/blogs/${id}`);
                      }}
                    >
                      OK
                    </button>
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
                  <p className="blog_comment_text">{comment.comment}</p>
                  <p className="blog_comment_author">
                    Von: {comment.authorName} am {comment.commentDate}
                  </p>
                  <div>
                    {comment.isPublishedByCurrentUser && (
                      <button
                        className="blog_delcomment_button"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        Kommentar löschen
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>Noch keine Kommentare</p>
            )}
            <div className="add-comment-section">
              <h3>Einen Kommentar hinzufügen</h3>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              {commentError && <p className="error">{commentError}</p>}
              <button
                className="blog_addComment_button"
                onClick={handleAddComment}
              >
                Kommentar hinzufügen
              </button>
            </div>
            {status === "loading" && (
              <div className="status-message loading">Loading...</div>
            )}
            {status === "error" && (
              <div>
                <div className="status-message error">{error}</div>
              </div>
            )}
            {status === "success" && message && (
              <div className="status-message success">{message}</div>
            )}
          </div>
          {showModalAddComment && (
            <div className="modal">
              <div className="modal-content">
                <h2>Kommentar hinzugefügt</h2>
                <p>Der Kommentar wurde erfolgreich hinzugefügt.</p>
                <button onClick={() => setShowModalAddComment(false)}>
                  OK
                </button>
              </div>
            </div>
          )}
          {showModalDeleteComment && (
            <div className="modal">
              <div className="modal-content">
                <h2>Kommentar gelöscht</h2>
                <p>Der Kommentar wurde erfolgreich gelöscht.</p>
                <button onClick={() => setShowModalDeleteComment(false)}>
                  OK
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div>Kein Blog gefunden</div>
      )}
      <Breadcrumb />
    </div>
  );
};

export default BlogDetails;
