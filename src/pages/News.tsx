import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import NewsComponent from '../features/news/NewsComponent';
import { fetchFilteredNews, fetchNews, INewsItem } from '../features/news/newsSlice';
// import Dropdown from 'react-bootstrap/DropDown';git 
import '../style/news.css'
import { topSlice } from "../layout/header/topElSlice";
import Spinner from '../features/mainPage/components/spinner/Spinner';

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
    dispatch(topSlice.actions.setCurrentPage(1));
  }, [dispatch]);

  useEffect(() => {
    if (selectedSection !== 'inland') {
      setSelectedRegion(undefined);
    }
    dispatch(fetchFilteredNews({
      page: 0,
      section: selectedSection || '',
      region: selectedRegion || ''
    }));
  }, [selectedSection, selectedRegion, dispatch]);

  // const handleFilter = () => {
  //   dispatch(fetchFilteredNews({
  //     page: 0,
  //     section: selectedSection || '',
  //     region: selectedRegion || ''
  //   }));
  // };
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
  // const handleRegionSelect: (eventKey: string | null) => void = (eventKey) => {
  //   if (eventKey !== null) {
  //     setSelectedRegion(eventKey);
  //   }
  // };

  const handleSectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSection = event.target.value;
    setSelectedSection(newSection);
    // Сбрасываем регион при изменении секции
    setSelectedRegion(undefined);
  };


  const handleSectionSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSection(event.target.value);
  };

  const handleRegionSelect = (eventKey: string | null) => {
    if (eventKey !== null) {
      setSelectedRegion(eventKey);
    }
  };
  return (
    <section className="">
      <div className='container d-flex news_content'>
        <div className='news-aside col-md-4 col-lg-3'>
          <div className='filter_block d-flex flex-column'>
            <h3>Filter by Region</h3>
            {/* <Dropdown onSelect={handleRegionSelect}>
              <Dropdown.Toggle variant="success" id="dropdown-basic" disabled={selectedSection !== 'inland'}>
                {selectedRegion || "Select Region"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="">All Regions</Dropdown.Item>
                {regions
                  .filter(region => region !== 'non-region')
                  .map((region) => (
                    <Dropdown.Item key={region} eventKey={region}>
                      {region}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown> */}


          </div>
        </div>
        <div className='news-content col-md-8 col-lg-9'>
          <div className='filter_block d-flex justify-content-between mx-2'>
            {sections.map((section) => (
              <label className={`news-filter-btn ${selectedSection === section ? 'active' : ''}`} key={section}>
                <input
                  type="radio"
                  name="section"
                  value={section}
                  checked={selectedSection === section}
                  onChange={handleSectionChange}
                /> {section}
              </label>
            ))}
          </div>
          {status === 'idle' || status === "loading" ? (
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
              {/* <Spinner show={loading} color="red" /> */}
            </div>

          ) : status === 'success' ? (
            <div className='d-flex flex-wrap'>

              {newsArr.map((newsItem) => (
                <NewsComponent
                  key={newsItem.id}
                  newsItem={newsItem}
                />)
              )}
              <div className='pagination'>
                {Array.from({ length: pageCount }).map((_, index) => (
                  <button className={`page-number ${index === currentPage ? 'current' : ''}`}
                    key={index}
                    onClick={() => handlePageChange(index)}
                    disabled={index === currentPage}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>Error!</>
          )}
        </div>
      </div>

    </section>
  )
}

export default News


