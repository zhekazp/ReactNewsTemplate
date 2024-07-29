import React from "react"
const Ad = (props: {text: string}) => {
    return (
      <>
      <div className="aMainBlock">
          <h2>{props.text}</h2>
      </div>
      </>
    )
  }
  
  export default Ad