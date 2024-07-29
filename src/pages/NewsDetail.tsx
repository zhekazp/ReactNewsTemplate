import React, { FC, useEffect } from 'react'
import { AppDispatch, RootState } from '../store';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchNewsById } from '../features/news/newsSlice';

const NewsDetail: FC = () => {
    const dispatch: AppDispatch = useDispatch();
    
    const { id } = useParams();

    const newsItem = useSelector((state: RootState) => state.news.selectedNews);
    const status = useSelector((state: RootState) => state.news.status);

    useEffect(() => {
        if (id) {
            dispatch(fetchNewsById(Number(id)));
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
    <div>
         {status === "loading" && (
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
            { status === 'success' && newsItem &&(
              <div>
                 <h1>{newsItem.title}</h1>
            <img src={newsItem.titleImageWide} alt={newsItem.title} />
            <p>{newsItem.date}</p>
            <div dangerouslySetInnerHTML={{ __html: newsItem.content }}></div>
            <button onClick={handleLike}>
                {newsItem.isUserLikes ? 'Unlike' : 'Like'} ({newsItem.likes})
            </button>
            <button onClick={handleDislike}>
                {newsItem.isUserDislikes ? 'Remove Dislike' : 'Dislike'} ({newsItem.dislikes})
            </button>
              </div>
              
            )}
            {status === "error" && (
                <>Error load newsItem!</>
            )}
       
    </div>
  )
}

export default NewsDetail


