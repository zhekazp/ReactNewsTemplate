import Carousel from 'react-bootstrap/Carousel';
import Weather from '../components/weather/Weather';
import Ad from '../components/advertising/Ad';
import News from '../components/news/News';
import { news, worldNews, sprotNews } from '../config/news';
import NewsInfo from '../components/news/NewsInfo';
import Title from '../components/news/Title';
import { uid } from 'uid';
import Blog from '../components/blog/Blog';



const Main = () => {
  const weather = {
    city: "Berlin",
    temp: 16,
    max: 18,
    min: 15,
    description: "Überwiegend bewölkt",
    wind: 6.71,
    humidity: 93,
    ico: "10d"
  }

  return (
    <>
      <div className=".bg-dark"></div>
      <div className="container mainBlock">
        <div className="row">

          <div className="col-6 picBlock smallWidth">
            <Carousel fade="true">
              <Carousel.Item>
                <div className="picBlock">
                  <img width='100%' src={news[4].img} alt={news[4].title} />
                </div>
                <Carousel.Caption>
                  <h4>{news[4].title}</h4>
                  <NewsInfo info={news[4]} />
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <div className="picBlock">
                  <img width='100%' src={news[10].img} alt={news[10].title} />
                </div>
                <Carousel.Caption>
                  <h4>{news[10].title}</h4>
                  <p><NewsInfo info={news[10]} /></p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <div className="picBlock">
                  <img width='100%' src={news[6].img} alt={news[6].title} />
                </div>
                <Carousel.Caption>
                  <h4>{news[6].title}</h4>
                  <p>
                    <NewsInfo info={news[6]} />
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <div className="picBlock">
                  <img width='100%' src={news[18].img} alt={news[18].title} />
                </div>
                <Carousel.Caption>
                  <h4>{news[18].title}</h4>
                  <p>
                    <NewsInfo info={news[18]} />
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>


          </div>
          <div className="col-6 smallWidth">
            <div className="row ">

              <div className="col-6">
                <News city={false} info={news[16]} />
              </div>
              <div className="col-6">
                <News city={false} info={news[17]} />
              </div>
            </div>
            <div className="row">
              <div className="col-12 weatherPadding">
                <Weather weather={weather} />
              </div>
            </div>
          </div>
        </div>
        <Ad text="Bestes Web-Erstellungsteam – klicken Sie hier, um einen Rabatt zu erhalten" />
        <div className="row">

          <div className="col-12">
            <Title title="Bundesland Nachrichten" />
            <div className="row">
              {news.filter(item => item.regionId !== undefined && item.regionId !== 0).slice(20, 24)
                .map(item =>
                  <div key={uid()} className="col-3">
                    <News city={true} info={item} />
                  </div>
                )}
            </div>

          </div>
          <div className="col-12">
            <Title title="Ausland Nachrichten" />
            <div className="row">
              {worldNews.slice(0, 4)
                .map(item =>
                  <div key={uid()} className="col-3">
                    <News city={false} info={item} />
                  </div>
                )}
            </div>

          </div>
        </div>
        <Ad text="Hier kann Ihre Werbung platziert werden" />

        <div className="row">
          <div className="col-6 newSlider">
            <Title title="Sport Nachrichten" />
            <Carousel fade="true">
              <Carousel.Item>
                <div className="row">
                  <div className="col-6">
                    <News city={false} info={sprotNews[0]} />
                  </div>
                  <div className="col-6">
                    <News city={false} info={sprotNews[1]} />
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="row">
                  <div className="col-6">
                    <News city={false} info={sprotNews[2]} />
                  </div>
                  <div className="col-6">
                    <News city={false} info={sprotNews[3]} />
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="row">
                  <div className="col-6">
                    <News city={false} info={sprotNews[4]} />
                  </div>
                  <div className="col-6">
                    <News city={false} info={sprotNews[5]} />
                  </div>
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="col-6 newSlider">
            <Title title="Blogs" />
              <Blog text="Some text" />
              <Blog text="Some text" />
              <Blog text="Some text" />
          </div>
        </div>

      </div>

    </>
  )
}

export default Main