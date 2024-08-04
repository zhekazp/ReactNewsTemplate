import React, { FC } from "react";
import Marquee from "react-fast-marquee";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { uid } from "uid";
 
  const RunLine: FC = () => {
  const {news} = useSelector((state:RootState) => state.top);
  
  return (
    <div>
       <div className="run">
        <Marquee pauseOnHover={true}>
          {
          news.map((item, index) => (
            <span className="runText" key={uid()}>
              <a href={"/news/"+item.url}>{item.news}</a>
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default RunLine;
