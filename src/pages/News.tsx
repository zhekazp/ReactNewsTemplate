import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import NewsComponent from '../features/news/NewsComponent';
import { fetchFilteredNews, fetchNews, fetchRegions, fetchSections } from '../features/news/newsSlice';
import Dropdown from 'react-bootstrap/DropDown';
import '../style/news.css'
import Spinner from '../features/mainPage/components/spinner/Spinner';

const News = () => {
  const dispatch: AppDispatch = useDispatch();

  const { newsArr, status, sections = [], regions = [], pageCount, currentPage } = useSelector((state: RootState) => state.news);

  const [selectedSection, setSelectedSection] = useState<string | undefined>(undefined);
  const [selectedRegion, setSelectedRegion] = useState<string | undefined>(undefined);
  const [page, setPage] = useState<number>(0);
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

  // useEffect(() => {
  //   dispatch(fetchNews({page: 0}));
  // }, [dispatch]);

  // useEffect(() => {
  //   if (selectedSection !== 'inland') {
  //     setSelectedRegion(undefined);
  //   }
  //   dispatch(fetchFilteredNews({
  //     page: 0,
  //     section: selectedSection || '',
  //     region: selectedRegion || ''
  //   }));
  // }, [selectedSection, selectedRegion, dispatch]);
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

  // const handleFilter = () => {
  //   dispatch(fetchFilteredNews({
  //     page: 0,
  //     section: selectedSection || '',
  //     region: selectedRegion || ''
  //   }));
  // };
  const handlePageChange = (newPage: number) => {
    // dispatch(fetchFilteredNews({
    //   page: newPage,
    //   section: selectedSection || '',
    //   region: selectedRegion || ''
    // }));
  //   if (selectedSection || selectedRegion) {
  //     dispatch(fetchFilteredNews({
  //         page: newPage,
  //         section: selectedSection || '',
  //         region: selectedRegion || ''
  //     }));
  // } else {
  //     dispatch(fetchNews({ page: newPage }));
  // }
  setPage(newPage);
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
    setPage(0);
  };


  // const handleSectionSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedSection(event.target.value);
  // };

  // const handleRegionSelect = (eventKey: string | null) => {
  //   if (eventKey !== null) {
  //     setSelectedRegion(eventKey);
  //     setPage(0);
  //   }
  // };

  const handleRegionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRegion = event.target.value;
    setSelectedRegion(newRegion);
    setPage(0);
  };
  return (
    <section className="">
      <div className='container d-flex news_content'>
        <div className='news-content col-md-12'>
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
          <div className={`filter_block filter-region d-flex flex-wrap ${selectedSection !== 'inland' ? 'hidden' : ''}`}>
            <h4 className='newsTopTitle' style={{"width":"100%"}}>Filter by Region</h4>
            {regions
              .filter(region => region !== 'non-region')
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


