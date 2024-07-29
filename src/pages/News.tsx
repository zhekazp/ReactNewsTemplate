import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import NewsComponent from '../features/news/NewsComponent';
import { fetchNews,   INewsItem } from '../features/news/newsSlice';
import  Dropdown  from 'react-bootstrap/DropDown';
import '../style/news.css'

const News = () => {
  const dispatch: AppDispatch = useDispatch();

  const { newsArr, status } = useSelector((state: RootState) => state.news);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  useEffect(() => {
    // dispatch(fetchNews());

  //   if (selectedSection) {
  //     dispatch(fetchRegionsBySection(selectedSection));
  // } else{
    dispatch(fetchNews());
  // }


  }, [dispatch, selectedSection]);




  const handleSelect = (eventKey: string | null) => {
    if (eventKey) {
      setSelectedSection(eventKey);
  }
  };

  return (
    <section className= "">
      <div className='container d-flex news_content'>
        <div className='news-aside'>
          <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedSection || "Select Section"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
            {/* {news.map((section) => (
                                <Dropdown.Item 
                                    key={section} 
                                    eventKey={section}
                                >
                                    {section}
                                </Dropdown.Item>
                            ))} */}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className='news-content d-flex flex-wrap'>
          {status === "loading" && (
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          {status === 'success' && (newsArr.map((newsItem) => (
            <NewsComponent
            key={newsItem.id}
            newsItem={newsItem}
          /> )
          ))}
          {status === "error" && (
            <>Error!</>
          )}
        </div>
      </div>

    </section>
  )
}

export default News


