
const Weather = (props) => {
    const date = new Date();
    const days = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa" ];
    const month = ["Jan", "Feb", "Mär", "Apr", "Mai", "Juni", "Juli", "Aug",
        "Sept", "Okt", "Nov", "Dez"];
    const { city, temp,
        max, min,
        description, wind,
        humidity, ico } = props.weather;
    return (
        <>
            <div className="wMainblock">
                <div className='container'>
                    <div className='wBlock'>
                        <div className='wSmallBlock'>
                            <h4>{city}</h4>
                            <span>{days[date.getDay()] + " " + date.getDate() + " " + month[date.getMonth()]}</span>
                        </div>
                        <div className='wSmallBlock'>
                            <h2>{temp + " C"}</h2>
                            <span>{max + " / " + min}</span>
                            <br />
                        </div>
                        <div className='wSmallBlock'>
                            <img src={"http://openweathermap.org/img/w/" + ico + ".png"} alt="weather ico" />
                        </div>
                    </div>
                    <div className='wInfo'>
                        <span>{description}</span>
                        <br />
                        <span>{"Wind: " + wind}</span>
                        <br />
                        <span>{"Feuchtigkeit: " + humidity + "%"}</span>
                    </div>
                </div>



            </div >
        </>
    )
}

export default Weather