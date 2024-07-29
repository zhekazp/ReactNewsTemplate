import { InfinitySpin } from "react-loader-spinner";
import React from "react";


const Spinner = (props: {color:string; show:boolean}) => {
  console.log(props.show);
  
  return (
    <>
    {props.show ? (

    <div className="d-flex justify-content-center">
      <InfinitySpin
        width="200"
        color={props.color}
       />
    </div>) : (<></>) }
    </>)
};

export default Spinner;
