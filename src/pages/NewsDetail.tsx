import React, { FC, useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addComment, deleteComment, editComment, fetchComments, fetchNewsById, fetchPutReaction, formatDate } from '../features/news/newsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faComment, faPenToSquare, faThumbsDown, faThumbsUp, faTrash } from '@fortawesome/free-solid-svg-icons';


const NewsDetail: FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const { id } = useParams();

    const newsItem = useSelector((state: RootState) => state.news.selectedNews);
    const status = useSelector((state: RootState) => state.news.status);

    const comments = useSelector((state: RootState) => state.news.comments);

    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [editedComment, setEditedComment] = useState('');
    const [commentError, setCommentError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            dispatch(fetchNewsById(Number(id)));
            dispatch(fetchComments(Number(id)));
        }
        dispatch(topSlice.actions.setCurrentPage(1));
    }, [dispatch, id]);

    // useEffect(() => {
    //     console.log("NewsDetail status:", status);
    //     console.log("Selected news item:", newsItem);
    // }, [status, newsItem]);

    const handleReaction = (liked: boolean, disliked: boolean) => {
        if (id) {
            dispatch(fetchPutReaction({ newsId: Number(id), liked, disliked }));
        }
    };

    const handleEditComment = (commentId: number, comment: string) => {
        setEditingCommentId(commentId);
        setEditedComment(comment);
    };

    const handleDeleteComment = (commentId: number) => {
        dispatch(deleteComment({ commentId }));
    };

    const handleEditSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (id && comment.trim()) {
            setSubmitting(true);
            if (!comment.trim()) {
                setCommentError("Der Kommentar darf nicht leer sein.");
                return;
              }
              if (id) {
                dispatch(addComment({ newsId: Number(id), comment }));
                setComment("");
                setCommentError(null);
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
                                        className='form-control'
                                    />
                                </div>
                                {commentError && <p className="error">{commentError}</p>}
                                <button type='submit' className='btn btn-primary' disabled={submitting}>
                                    {submitting ? 'Submitting...' : 'Submit'}
                                </button>
                            </form>
                            <div className='comment-content p-4'>
                                <h2 className='newsTopTitle'>Comments:</h2>
                                {newsItem.commentsCount === 0 && <p className='empty-comments p-5 text-center'>There are no comments yet</p>}
                                {comments.map(comment => (
                                    <div key={comment.id} className="comment">
                                        <div className='comment-header d-flex justify-content-between'><strong>{comment.authorName}</strong> {formatDate(comment.commentDate)} </div>
                                        <p>{comment.comment}</p>
                                        {comment.isPublishedByCurrentUser && (
                                            <div className="comments-action">
                                                <button className="comment-edit" onClick={() => handleEditComment(comment.id, comment.comment)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                                                <button className="comment-delete" onClick={() => handleDeleteComment(comment.id)}><FontAwesomeIcon icon={faTrash} /></button>
                                            </div>
                                        )}
                                        {editingCommentId === comment.id && (
                                            <form className="edit-comment-form" onSubmit={handleEditSubmit}>
                                                <div className='form-group'>
                                                    <label htmlFor='editComment'>Edit your comment:</label>
                                                    <textarea
                                                        id='editComment'
                                                        value={editedComment}
                                                        onChange={(e) => setEditedComment(e.target.value)}
                                                        required
                                                        className='form-control'
                                                    />
                                                </div>
                                                <button type='submit' className='btn'>
                                                    Save
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                ))}
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


