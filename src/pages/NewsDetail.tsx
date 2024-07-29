import React, { FC, useEffect } from 'react'
import { AppDispatch, RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchComments, fetchNewsById, formatDate } from '../features/news/newsSlice';


const NewsDetail: FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const { id } = useParams();

    const newsItem = useSelector((state: RootState) => state.news.selectedNews);
    const status = useSelector((state: RootState) => state.news.status);

    const comments = useSelector((state: RootState) => state.news.comments);

    useEffect(() => {
        if (id) {
            dispatch(fetchNewsById(Number(id)));
            dispatch(fetchComments(Number(id)));
        }
    }, [dispatch, id]);

    useEffect(() => {
        console.log("NewsDetail status:", status);
        console.log("Selected news item:", newsItem);
    }, [status, newsItem]);

    const handleLike = () => {
        // if (newsItem.isUserLikes) {
        //     dispatch(unlikeNews(newsItem.newsId));
        // } else {
        //     dispatch(likeNews(newsItem.newsId));
        // }
    };

    const handleDislike = () => {
        // if (newsItem.isUserDislikes) {
        //     dispatch(undislikeNews(newsItem.newsId));
        // } else {
        //     dispatch(dislikeNews(newsItem.newsId));
        // }
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
                            <div className='news-meta'>
                                <p>{formatDate(newsItem.date)}</p>
                                {/* <button onClick={handleLike}>
                                {newsItem.isUserLikes ? 'Unlike' : 'Like'} ({newsItem.likes})
                            </button>
                            <button onClick={handleDislike}>
                                {newsItem.isUserDislikes ? 'Remove Dislike' : 'Dislike'} ({newsItem.dislikes})
                            </button> */}
                            </div>

                            <div dangerouslySetInnerHTML={{ __html: newsItem.content }}></div>

                        </div>
                        <div className='news_comments'>
                        <h2>Comments:</h2>
                            {newsItem.commentsCount === 0 && <p>There are no comments yet</p>}
                            {comments.map(comment => (
                                <div key={comment.id} className="comment">
                                    <p><strong>{comment.authorName}</strong> {formatDate(comment.commentDate)} </p>
                                    <p>{comment.comment}</p>
                                </div>
                            ))}
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


