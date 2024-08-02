import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminNews,
  deleteNewsItem,
  fetchCommentsByNewsId,
} from "./adminNewsSlice";
import { RootState, AppDispatch } from "../../../store";
import NewsComponent from "../../news/NewsComponent";

const NewsManagement = () => {
  const dispatch: AppDispatch = useDispatch();
  const { news, comments, status, error } = useSelector(
    (state: RootState) => state.adminNews
  );

  useEffect(() => {
    dispatch(fetchAdminNews());
  }, [dispatch]);

  const handleDelete = (newsId: number) => {
    dispatch(deleteNewsItem(newsId));
  };

  const handleFetchComments = (newsId: number) => {
    dispatch(fetchCommentsByNewsId(newsId));
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error: {error}</p>;

  return (
    <div>
      {news.map((newsItem) => (
        <div key={newsItem.id}>
          <NewsComponent newsItem={newsItem} />
          <button onClick={() => handleDelete(newsItem.id)}>Delete</button>
          <button onClick={() => handleFetchComments(newsItem.id)}>
            Show Comments
          </button>
          <div>
            {comments[newsItem.id]?.map((comment) => (
              <p key={comment.id}>{comment.comment}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsManagement;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState, AppDispatch } from "../../../store";
// import { fetchNews, fetchComments, deleteNews } from "../../news/newsSlice";
// import NewsComponent from "../../news/NewsComponent";

// const AdminNewsManagement: React.FC = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const { newsArr, status, comments } = useSelector(
//     (state: RootState) => state.news
//   );

//   useEffect(() => {
//     dispatch(fetchNews());
//   }, [dispatch]);

//   const handleDeleteNews = (newsId: number) => {
//     if (window.confirm("Вы уверены, что хотите удалить эту новость?")) {
//       dispatch(deleteNews(newsId));
//     }
//   };

//   const handleShowComments = (newsId: number) => {
//     dispatch(fetchComments(newsId));
//   };

//   return (
//     <div>
//       <h2>Управление новостями</h2>
//       {status === "loading" && <p>Загрузка...</p>}
//       {status === "error" && <p>Ошибка загрузки новостей.</p>}
//       {status === "success" &&
//         newsArr.map((newsItem) => (
//           <div key={newsItem.id}>
//             <NewsComponent newsItem={newsItem} />
//             <button onClick={() => handleShowComments(newsItem.id)}>
//               Показать комментарии
//             </button>
//             <button onClick={() => handleDeleteNews(newsItem.id)}>
//               Удалить новость
//             </button>
//             {comments &&
//               comments
//                 .filter((comment) => comment.newsId === newsItem.id)
//                 .map((comment) => (
//                   <div key={comment.id}>
//                     <p>
//                       {comment.authorName}: {comment.comment}
//                     </p>
//                   </div>
//                 ))}
//           </div>
//         ))}
//     </div>
//   );
// };

// export default AdminNewsManagement;
