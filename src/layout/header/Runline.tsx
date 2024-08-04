import React, { FC } from "react";
import Marquee from "react-fast-marquee";
import { TopElementProps } from "./TopElement";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
 
  const RunLine: FC = () => {
  const {news} = useSelector((state:RootState) => state.top);
  
  return (
    <div>
       <div className="run">
        <Marquee pauseOnHover={true}>
          {
          news.map((item, index) => (
            <span className="runText" key={item + index}>
              <a href={"/news/"+item.url}>{item.news}</a>
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default RunLine;
