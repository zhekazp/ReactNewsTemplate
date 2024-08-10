import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import NewsComponent from '../features/news/NewsComponent';
<<<<<<< HEAD
import { fetchNews, fetchNewsBySection, INewsItem } from '../features/news/newsSlice';
import  Dropdown  from 'react-bootstrap/DropDown';
=======
import { fetchFilteredNews, fetchNews, fetchRegions, fetchSections } from '../features/news/newsSlice';
import { topSlice } from "../layout/header/topElSlice";
import Spinner from '../features/mainPage/components/spinner/Spinner';
import ResponsivePagination from 'react-responsive-pagination';
import '../style/news.css'

>>>>>>> 161292b5d4fbb932f5678b4924c3aa9712feb9db

const News = () => {
  const dispatch: AppDispatch = useDispatch();

<<<<<<< HEAD
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
=======
  const { newsArr, status, pageCount, currentPage, sections, regions } = useSelector((state: RootState) => state.news);

  const [selectedSection, setSelectedSection] = useState<string | undefined>(undefined);
  const [selectedRegion, setSelectedRegion] = useState<string | undefined>(undefined);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    dispatch(fetchRegions());
    dispatch(fetchSections());
    // Выполняем запрос, только если есть выбранная секция или регион
    if (selectedSection || selectedRegion) {
      dispatch(fetchFilteredNews({
        page,
        section: selectedSection || '',
        region: selectedRegion || ''
      }));
    } else {
      dispatch(fetchNews({ page }));
    }
  }, [dispatch, selectedSection, selectedRegion, page]);

  const handlePageChange = (newPage: number) => {
  setPage(newPage);
  };

  const handleSectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSection = event.target.value;
    setSelectedSection(newSection);
    // Сбрасываем регион при изменении секции
    setSelectedRegion(undefined);
    setPage(0);
  };


  const handleRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRegion = event.target.value;
    setSelectedRegion(newRegion);
    setPage(0);
  };
  return (
    <section className="">
      <div className='container d-flex news_content'>
        <div className='news-content col-md-12'>
          <div className='filter_block d-flex'>
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
          <div className={`filter_block filter-region ${selectedSection !== 'inland' ? 'hidden' : ''}`}>
            <h4 className='newsTopTitle' style={{"width":"100%"}}>Filter nach Region</h4>
            <div className='row d-flex flex-wrap'>
            {regions
              .filter(region => region !== 'non-region' && region !== 'Deutschland')
              .map((region) => (
                <label key={region} className={`region-filter-btn news-filter-btn  ${selectedRegion === region ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="region"
                    value={region}
                    checked={selectedRegion === region}
                    onChange={handleRegionChange}
                  /> {region}
                </label>
              ))}
            </div>
          </div>
          {status === 'idle' || status === "loading" ? (
            <Spinner show={loading} color="red" />
          ) : status === 'success' ? (
            <div className='d-flex flex-wrap'>

              {newsArr.map((newsItem) => (
                <NewsComponent
                  key={newsItem.id}
                  newsItem={newsItem}
                />)
              )}
                {/* {Array.from({ length: pageCount }).map((_, index) => (
                  <button className={`page-number ${index === currentPage ? 'current' : ''}`}
                    key={index}
                    onClick={() => handlePageChange(index)}
                    disabled={index === currentPage}
                  >
                    {index + 1}
                  </button>
                ))} */}
                { pageCount > 1 &&(<ResponsivePagination
                current={currentPage + 1}  
                total={pageCount}        
                onPageChange={(newPage) => handlePageChange(newPage - 1)} 
                maxWidth={10}
                 // Переключение страниц (нумерация начинается с 0)
              />)}
             
            </div>
          ) : (
>>>>>>> 161292b5d4fbb932f5678b4924c3aa9712feb9db
            <>Error!</>
          )}
        </div>
      </div>

    </section>
  )
}

export default News


