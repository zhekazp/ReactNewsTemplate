import React, { FC } from "react";
import Marquee from "react-fast-marquee";
import { TopElementProps } from "./TopElement";


 const RunLine: FC<TopElementProps> = (props) => {
  return (
    <div>
      <div className="run">
        <Marquee pauseOnHover={true}>
          {props.news.map((item, index) => (
            <span className="runText" key={item + index}>
              <a href="">{item}</a>
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default RunLine;
