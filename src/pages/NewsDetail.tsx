
import React, { FC, useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addComment, deleteComment, editComment, fetchComments, fetchNewsById, fetchPutReaction, formatDate } from '../features/news/newsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faComment, faPenToSquare, faThumbsDown, faThumbsUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { topSlice } from '../layout/header/topElSlice';
import { Spinner } from 'react-bootstrap';



const NewsDetail: FC = () => {
    const dispatch: AppDispatch = useDispatch();


    const { id } = useParams();

    const newsItem = useSelector((state: RootState) => state.news.selectedNews);
    const status = useSelector((state: RootState) => state.news.status);
    const statusAdd = useSelector((state: RootState) => state.news.statusCommentAdding);




    const comments = useSelector((state: RootState) => state.news.comments);

    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [editedComment, setEditedComment] = useState('');
    const [commentError, setCommentError] = useState<string | null>(null);
    const [updateTrigger, setUpdateTrigger] = useState(0);
    const [authError, setAuthError] = useState<string | null>(null);

    const currentUserString = localStorage.getItem("user");
    const currentUser = currentUserString ? JSON.parse(currentUserString) : null;
    const token = currentUser ? currentUser.token : null;



    useEffect(() => {
        if (id) {
            dispatch(fetchNewsById(Number(id)));
            dispatch(fetchComments(Number(id)));
        }
        dispatch(topSlice.actions.setCurrentPage(1));
    }, [dispatch, id, updateTrigger]);

    // useEffect(() => {
    //     console.log("NewsDetail status:", status);
    //     console.log("Selected news item:", newsItem);
    // }, [status, newsItem]);


    const handleReaction = async (liked: boolean, disliked: boolean) => {
        try {
            await dispatch(fetchPutReaction({ newsId: Number(id), liked, disliked }));
        } catch (error) {
            setAuthError(
                "Sie müssen sich anmelden, um einen neuen Blog hinzuzufügen."
            );
        }
    };
    const handleEditComment = (id: number, comment: string) => {
        setEditingCommentId(id);
        setEditedComment(comment);
    };

    // const handleDeleteComment = async (commentId: number) => {
    //     try {
    //         await dispatch(deleteComment({ commentId })).unwrap();
    //         setUpdateTrigger((prev) => prev + 1);
    //     } catch (error) {
    //         console.error("Failed to delete comment:", error);
    //     }
    // };
    const handleDeleteComment = async (commentId: number) => {
        try {
            await dispatch(deleteComment(commentId)).unwrap();
            setUpdateTrigger((prev) => prev + 1);
        } catch (error) {
            console.error("Failed to delete comment:", error);
        }
    };

    const handleEditCommentText = async () => {
        if (!editedComment.trim()) {
            setCommentError("The comment cannot be empty.");
            return;
        }
        if (editingCommentId !== null) {
            console.log("Editing Comment ID:", editingCommentId); // Логирование ID комментария
            console.log("Edited Comment:", editedComment);
            try {
                await dispatch(editComment({ id: editingCommentId, comment: editedComment, newsId: Number(id) })).unwrap();
                setEditingCommentId(null); // Close the edit form
                setEditedComment(''); // Clear the edited comment text
                setCommentError(null); // Clear any previous error
                setUpdateTrigger((prev) => prev + 1); // Trigger a state update to refresh the comments
                dispatch(fetchComments(Number(id)));
            } catch (error) {
                console.error("Failed to edit comment:", error);
                setCommentError("Failed to edit comment");
            }
        } else {
            setCommentError("ID do not exist.");
        }
    }
    const handleAddComment = async () => {
        if (!comment.trim()) {
            setCommentError("Der Kommentar darf nicht leer sein.");
            return;
        }
        if (id) {
            try {
                console.log("Sending comment data:", { newsId: Number(id), comment });
                await dispatch(addComment({ newsId: Number(id), comment })).unwrap();
                setComment("");
                setCommentError(null);  
                // setUpdateTrigger((prev) => prev + 1);
            } catch (error) {
                console.error("Fehler beim Hinzufügen des Kommentars:", error);
                setCommentError("Failed to add comment");
            }
        }
    };

    return (
        <section>
            <div className='container'>
                {status === "loading" && (
                    <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )}
                {status === 'success' && newsItem && (
                    <div>
                        {authError && <p className="error">{authError}</p>}
                        <div className='newsItem_content'>
                            <img width='100%' src={newsItem.titleImageWide} alt={newsItem.title} />
                            <div className='newsItem-content p-4'>
                                <h1 className='newsItem-title'>{newsItem.title}</h1>
                                <div className='news-meta d-flex align-items-center my-4'>
                                    <p className='m-0'><FontAwesomeIcon icon={faClock} /> {formatDate(newsItem.date)}</p>
                                    <button className='activity_sm_block' onClick={() => handleReaction(true, false)}>
                                        <FontAwesomeIcon icon={faThumbsUp} /><span className='activity_counter'> {newsItem.likeCount}</span>
                                    </button>
                                    <button className='activity_sm_block' onClick={() => handleReaction(false, true)}>
                                        <FontAwesomeIcon icon={faThumbsDown} /><span className='activity_counter'> {newsItem.dislikeCount}</span>
                                    </button>
                                    <span><FontAwesomeIcon icon={faComment} /> {newsItem.commentsCount}</span>
                                </div>
                                {authError && <p className="error">{authError}</p>}
                                <div dangerouslySetInnerHTML={{ __html: newsItem.content }}></div>
                            </div>

                        </div>
                        <div className='news_comments'>

                            <h3 className='newsTopTitle'>Leave a Comment:</h3>
                            <form className='comment-form p-4'>
                                {/* <div className='form-group'>
                                        <label htmlFor='authorName'>Name:</label>
                                        <input
                                            type='text'
                                            id='authorName'
                                            value={authorName}
                                            onChange={(e) => setAuthorName(e.target.value)}
                                            required
                                            className='form-control'
                                        />
                                    </div> */}
                                
                                <div className='form-group'>
                                    <label htmlFor='comment'>Enter your comment:</label>
                                    <textarea
                                        id='comment'
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        required
                                        className=' form-input'
                                    />
                                </div>
                                {commentError && <p className="error">{commentError}</p>}
                                {statusAdd === 'loading' ? <Spinner /> :
                                <button type='submit' className='submit-btn' disabled={submitting} onClick={handleAddComment}>
                                    {submitting ? 'Submitting...' : 'Submit'}
                                </button>}
                            </form>
                            <div className='comment-content p-4'>
                                <h2 className='newsTopTitle'>Comments:</h2>
                                {comments.length=== 0 ? <p className='empty-comments p-5 text-center'>There are no comments yet</p>:
                                <></>
                                }
                                {comments.slice().reverse().map(comment => {
                                    console.log("isPublishedByCurrentUser:", comment.isPublishedByCurrentUser);
                                    return (
                                        <div key={comment.id} className="comment">
                                            <div className='comment-header d-flex justify-content-between'><strong>{comment.authorName}</strong>   
                                            {comment.isPublishedByCurrentUser && (
                                                <div className="comments-action">
                                                    <button className="comment-edit" onClick={() => handleEditComment(comment.id, comment.comment)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                                    <button className="comment-delete" onClick={() => handleDeleteComment(comment.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                                </div>
                                            )} {formatDate(comment.commentDate)}</div>
                                            <p>{comment.comment}</p>
                                            {editingCommentId === comment.id && (
                                                <form className="edit-comment-form" onSubmit={(e) => { e.preventDefault(); handleEditCommentText(); }}>
                                                    <div className='form-group'>
                                                        <label htmlFor='editComment'>Edit your comment:</label>
                                                        <textarea
                                                            id='editComment'
                                                            value={editedComment}
                                                            onChange={(e) => setEditedComment(e.target.value)}
                                                            required
                                                            className=' form-input'
                                                        />
                                                    </div>
                                                    <button type='submit' className='submit-btn'>
                                                        Save
                                                    </button>
                                                </form>
                                            )}
                                        </div>
                                    )
                                }

                                )}
                            </div>

                        </div>
                    </div>
                )}
                {status === "error" && (
                    <>Error load newsItem!</>
                )}
            </div>

        </section>
    )

}

export default NewsDetail


