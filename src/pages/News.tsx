import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import NewsComponent from '../features/news/NewsComponent';
import { fetchFilteredNews, fetchNews, INewsItem } from '../features/news/newsSlice';
import Dropdown from 'react-bootstrap/DropDown';
import '../style/news.css'

const News = () => {
  const dispatch: AppDispatch = useDispatch();

  const { newsArr, status, sections = [], regions = [], pageCount, currentPage } = useSelector((state: RootState) => state.news);

  const [selectedSection, setSelectedSection] = useState<string | undefined>(undefined);
  const [selectedRegion, setSelectedRegion] = useState<string | undefined>(undefined);
  // const [currentPage, setCurrentPage] = useState(0);
  // const [page, setPage] = useState(0);

  // useEffect(() => {
  //   // dispatch(fetchNews());

  // //   if (selectedSection) {
  // //     dispatch(fetchRegionsBySection(selectedSection));
  // // } else{
  //   dispatch(fetchNews());
  // // }


  // }, [dispatch, selectedSection]);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const handleFilter = () => {
    dispatch(fetchFilteredNews({
      page: 0,
      section: selectedSection || '',
      region: selectedRegion || ''
    }));
  };
  const handlePageChange = (newPage: number) => {
    dispatch(fetchFilteredNews({
      page: newPage,
      section: selectedSection || '',
      region: selectedRegion || ''
    }));
  };
  // const handleSelect = (eventKey: string | null) => {
  //   if (eventKey) {
  //     setSelectedSection(eventKey);
  // }
  // };

  return (
    <section className="">
      <div className='container d-flex news_content'>
        <div className='news-aside col-md-4 col-lg-3'>
          <div className='filter_block d-flex flex-column'>
            <h3>Filter by Section</h3>
            {sections.map((section) => (
              <label key={section}>
                <input
                  type="radio"
                  name="section"
                  value={section}
                  checked={selectedSection === section}
                  onChange={(e) => setSelectedSection(e.target.value)}
                /> {section}
              </label>
            ))}
          </div>
          <div className='filter_block d-flex flex-column'>
            <h3>Filter by Region</h3>
            {regions.map((region) => (
              <label key={region}>
                <input
                  type="radio"
                  name="region"
                  value={region}
                  checked={selectedRegion === region}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  disabled={selectedSection !== 'inland'}
                /> {region}
              </label>
            ))}


          </div>
          <button onClick={handleFilter}>Filter</button>
        </div>
        <div className='news-content col-md-8 col-lg-9'>
          {status === "loading" && (
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          {status === 'success' && (
            <div className='d-flex flex-wrap'>

              {newsArr.map((newsItem) => (
                <NewsComponent
                  key={newsItem.id}
                  newsItem={newsItem}
                />)
              )}
              <div className='pagination'>
                {Array.from({ length: pageCount }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index)}
                    disabled={index === currentPage}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
          {status === "error" && (
            <>Error!</>
          )}
        </div>
      </div>

    </section>
  )
}

export default News


