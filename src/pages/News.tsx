import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import NewsComponent from '../features/news/NewsComponent';
import { fetchNews, fetchNewsBySection, INewsItem } from '../features/news/newsSlice';
import  Dropdown  from 'react-bootstrap/DropDown';

const News = () => {
  const dispatch: AppDispatch = useDispatch();

  const { newsArr, status, sections } = useSelector((state: RootState) => state.news);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  useEffect(() => {
    // dispatch(fetchNews());

    if (selectedSection) {
      dispatch(fetchNewsBySection(selectedSection));
  } else{
    dispatch(fetchNews());
  }


  }, [dispatch, selectedSection]);




  const handleSelect = (eventKey: string | null) => {
    if (eventKey) {
      setSelectedSection(eventKey);
  }
  };

  return (
    <section>
      <div className='container d-flex'>
        <div className='news-aside'>
          <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedSection || "Select Section"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
            {sections.map((section) => (
                                <Dropdown.Item 
                                    key={section} 
                                    eventKey={section}
                                >
                                    {section}
                                </Dropdown.Item>
                            ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className='news-content'>
          {status === "loading" && (
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          {status === 'success' && (newsArr.map((newsItem) => (
            <NewsComponent
              key={newsItem.id}
              newsItem={newsItem}
            />)
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


