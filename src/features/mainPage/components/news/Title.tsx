import React from "react"
const Title = (props: {title: string}) => {
    return (
        <>
            <div>
                <h3 className="newsTopTitle">{props.title}</h3>
            </div>
        </>
    )
}

export default Title