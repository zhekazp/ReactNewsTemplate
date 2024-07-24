import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import NewsComponent from '../features/news/NewsComponent';
import { fetchNews } from '../features/news/newsSlice';

const News = () => {
  const dispatch: AppDispatch = useDispatch();
  const { newsArr, status } = useSelector((state: RootState) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]); 
  useEffect(() => {
    console.log("News status:", status);
    console.log("News items:", newsArr);
  }, [status, newsArr]);
  return (
    <div>
      {status === "loading" && (
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
            { status === 'success' && (newsArr.map((newsItem) => (
              <NewsComponent
                key={newsItem.id}
                newsItem={newsItem}
              />)
            ))}
            {status === "error" && (
                <>Error!</>
            )}


    </div>
    )
}

export default News





// import React from 'react'
// import { AppDispatch, RootState } from '../store';
// import { useDispatch, useSelector } from 'react-redux';
// import NewsComponent from '../features/news/NewsComponent';

// const News = () => {
//   const { newsItems, status } = useSelector((state: RootState) => state.news);
//   const dispatch: AppDispatch = useDispatch();

//   return (
//     <div>
//       <div className="container mt-4">
//           <h1 className="mb-4 text-center">News List</h1>
//          { newsItems.map((newsItem) => (
//               <NewsComponent
//                 key={newsItem.id}
//                 newsItem={newsItem}
//               />
//             ))}
//           {/* <div>
//             {status === "loading" && (
//                 <div className="spinner-border text-warning" role="status">
//                     <span className="visually-hidden">Loading...</span>
//                 </div>
//             )}
//             { status === 'success' && newsItems.map((newsItem) => (
//               <NewsComponent
//                 key={newsItem.id}
//                 newsItem={newsItem}
//               />
//             ))}
//             {status === "error" && (
//                 <>Error!</>
//             )}
//           </div> */}
//         </div>
//     </div>
//   )
// }

// export default News