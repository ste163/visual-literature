import React from "react"
import "./Icons.css"

export const IconGraph = props => {
    return (
        <svg className="icon__graph" width="20" height="20" version="1.1" viewBox="0 0 5.2918 5.2918" xmlns="http://www.w3.org/2000/svg">
            <title>Graph Icon</title>
            <rect className={props.color} id="axis_y" x=".03793" y=".037848" width="1.0311" height="5.2158" ry=".51554" style={{strokeWidth:".41059"}}/>
            <rect className={props.color} id="axis_x" transform="rotate(90)" x="4.2228" y="-5.2538" width="1.0311" height="5.2158" ry=".51554" style={{strokeWidth:".41059"}}/>
            <rect className={props.color} x="1.3569" y="2.1778" width="1.0312" height="1.814" ry=".51554" style={{strokeWidth:".41059"}}/>
            <rect className={props.color} x="2.6548" y="1.3345" width="1.0312" height="2.6573" ry=".51554" style={{strokeWidth:".41059"}}/>
            <rect className={props.color} x="4.0126" y=".24815" width="1.0312" height="3.7436" ry=".51554" style={{strokeWidth:".41059"}}/>
        </svg>
    )
}