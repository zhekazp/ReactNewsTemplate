import React, { FC, useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchComments, fetchNewsById, fetchPutReaction, formatDate } from '../features/news/newsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';


const NewsDetail: FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const { id } = useParams();

    const newsItem = useSelector((state: RootState) => state.news.selectedNews);
    const status = useSelector((state: RootState) => state.news.status);

    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const comments = useSelector((state: RootState) => state.news.comments);

    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchNewsById(Number(id)));
            dispatch(fetchComments(Number(id)));
        }
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
                            <img src={newsItem.titleImageWide} alt={newsItem.title} />
                            <h1>{newsItem.title}</h1>
                            <div className='news-meta d-flex align-items-center my-4'>
                                <p className='m-0'>{formatDate(newsItem.date)}</p>
                                <button onClick={() => handleReaction(true, false)}>
                                <span className='activity_sm_block'><FontAwesomeIcon icon={faThumbsUp} /><span className='activity_counter'>{newsItem.likeCount}</span></span>
                            </button>
                            <button onClick={() => handleReaction(false, true)}>
                            <span  className='activity_sm_block'><FontAwesomeIcon icon={faThumbsDown} /><span className='activity_counter'>{newsItem.dislikeCount}</span></span>
                            </button>
                            </div>

                            <div dangerouslySetInnerHTML={{ __html: newsItem.content }}></div>

                        </div>
                        <div className='news_comments'>
                            <h2>Comments:</h2>
                            <div className='comment-form'>
                                <h3>Leave a Comment:</h3>
                                <form>
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
                                    <button type='submit' className='btn btn-primary' disabled={submitting}>
                                        {submitting ? 'Submitting...' : 'Submit'}
                                    </button>
                                </form>

                                {newsItem.commentsCount === 0 && <p>There are no comments yet</p>}
                                {comments.map(comment => (
                                    <div key={comment.id} className="comment">
                                        <p><strong>{comment.authorName}</strong> {formatDate(comment.commentDate)} </p>
                                        <p>{comment.comment}</p>
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


