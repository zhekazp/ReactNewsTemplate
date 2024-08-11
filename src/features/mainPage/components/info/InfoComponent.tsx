import React from "react";
import ViewInfo from "./ViewInfo";
const InfoComponent = (props: {
  info: { name: string; price: number; region: string };
}) => {
  const info = {
    price: props.info.price,
    region: props.info.region,
  };
  return (
    <>
      <div className="wMainblock blog">
        <div >
          <h2 className="infoH2">{props.info.name}</h2>
          <ViewInfo smallInfo={info} />
        </div>
      </div>
    </>
  );
};

export default InfoComponent;
