import { InfinitySpin } from "react-loader-spinner";
import React from "react";


const Spinner = (props: {color:string; show:boolean}) => {
<<<<<<< HEAD
  console.log(props.show);
=======
>>>>>>> 161292b5d4fbb932f5678b4924c3aa9712feb9db
  
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
