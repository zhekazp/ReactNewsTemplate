
import React, { FC, useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addComment, deleteComment, editComment, fetchComments, fetchNewsById, fetchPutReaction, formatDate } from '../features/news/newsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faComment, faPenToSquare, faThumbsDown, faThumbsUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { topSlice } from '../layout/header/topElSlice';
import Spinner from '../features/mainPage/components/spinner/Spinner';
import Modal from '../features/blog/blogs/Modal';



const NewsDetail: FC = () => {
    const dispatch: AppDispatch = useDispatch();


    const { id } = useParams();

    const newsItem = useSelector((state: RootState) => state.news.selectedNews);
    const reaction = useSelector((state: RootState) => state.news.reaction);
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
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [likeUser, setLikeUser] = useState<boolean>(false);
    const [dislikeUser, setDisLikeUser] = useState<boolean>(false);
        
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

  
    const handleReaction = async (like: boolean) => {
       
        if (!currentUser) {
            setShowModal(true);
            return;
        }
        let liked = false;
        let disliked = false;
        
        if(like){
             liked = !reaction.like;
        } else 
            disliked = !reaction?.dislike;
        try {
            await dispatch(fetchPutReaction({ newsId: Number(id), liked, disliked }));
        } catch (error) {
            setAuthError(
                "Error to send reaction"
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
            // setUpdateTrigger((prev) => prev + 1);
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
            try {
                await dispatch(editComment({ id: editingCommentId, comment: editedComment, newsId: Number(id) })).unwrap();
                setEditingCommentId(null); // Close the edit form
                setEditedComment(''); // Clear the edited comment text
                setCommentError(null); // Clear any previous error
                // setUpdateTrigger((prev) => prev + 1); // Trigger a state update to refresh the comments
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
        if (!currentUser) {
            setShowModal(true);
            return;
        }
        if (!comment.trim()) {
            setCommentError("Der Kommentar darf nicht leer sein.");
            return;
        }
        if (id) {
            try {
                await dispatch(addComment({ newsId: Number(id), comment })).unwrap();
                setComment("");
                setCommentError(null);
               
            } catch (error) {
                console.error("Fehler beim Hinzufügen des Kommentars:", error);
                setCommentError("Failed to add comment");
            }
        }
    };
    const handleCancelEdit = () => {
        setEditingCommentId(null);
        setEditedComment('');
        setCommentError(null);
    };

    return (
        <section className='news-detail'>
            <div className='container'>
                {status === "loading" && (
                   <Spinner show={loading} color="red" />
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
                                    <button className={ reaction.like ?'activity_sm_block_reacted' :'activity_sm_block'} onClick={() => handleReaction(true)}>
                                        <FontAwesomeIcon icon={faThumbsUp} />
                                        <span className='activity_counter'> {reaction.likeCount}</span>
                                    </button>
                                    <button className={ reaction.dislike ?'activity_sm_block_reacted' :'activity_sm_block'} onClick={() => handleReaction(false)}>
                                        <FontAwesomeIcon icon={faThumbsDown} /><span className='activity_counter'> {reaction.dislikeCount}</span>
                                    </button>
                                    <span><FontAwesomeIcon icon={faComment} /> {comments.length}</span>
                                </div>
                                {authError && <p className="error">{authError}</p>}
                                <div dangerouslySetInnerHTML={{ __html: newsItem.content }}></div>
                            </div>

                        </div>
                        <div className='news_comments'>

                            <h3 className='newsTopTitle'>Kommentar hinzufügen:</h3>
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
                                    <label htmlFor='comment'>Einen Kommentar hinzufügen:</label>
                                    <textarea
                                        id='comment'
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        required
                                        className=' form-input'
                                    />
                                </div>
                                {commentError && <p className="error">{commentError}</p>}
                                {statusAdd === 'loading' ?  <Spinner show={loading} color="red" /> :
                                    <button type='submit' className='submit-btn' disabled={submitting} onClick={handleAddComment}>
                                        {submitting ? 'Einreichen...' : 'Hinzufügen'}
                                    </button>}
                            </form>
                            <div className='comment-content p-4'>
                                <h2 className='newsTopTitle'> Alle Kommentare:</h2>
                                {comments.length === 0 ? <p className='empty-comments p-5 text-center'>Es wurden noch keine Kommentare hinterlassen.</p> :
                                    <></>
                                }
                                {comments.slice().reverse().map(comment => {
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
                                                        <label htmlFor='editComment'>Bearbeiten Sie Ihren Kommentar:</label>
                                                        <textarea
                                                            id='editComment'
                                                            value={editedComment}
                                                            onChange={(e) => setEditedComment(e.target.value)}
                                                            required
                                                            className=' form-input'
                                                        />
                                                    </div>
                                                    <div className='btns-bottom'>
                                                        <button type='submit' className='submit-btn'>
                                                        ändern
                                                        </button>
                                                        <button type='button' className='submit-btn' onClick={handleCancelEdit}>
                                                            Löschen
                                                        </button>
                                                    </div>
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
                {showModal && (
                    <Modal
                        title="Anmeldung erforderlich"
                        content="Dieser Vorgang kann nur von einem angemeldeten Benutzer durchgeführt werden. Bitte melden Sie sich bei Ihrem Konto an."
                        onClose={() => setShowModal(false)}
                    />
                )}
            </div>

        </section>
    )

}

export default NewsDetail


