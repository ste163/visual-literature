import React from "react"
import "./Icons.css"

export const IconArrow = props => (
    <svg className="icon__arrow" width="35" height="20" version="1.1" viewBox="0 0 9.2606 5.2918" xmlns="http://www.w3.org/2000/svg">
        <title>Arrow Icon</title>
        <g transform="matrix(.526 0 0 .526 -.93661 -2.9209)">
            <rect className={props.color} id="line_right" transform="rotate(45)" x="16.259" y="-8.8998" width="2.5113" height="12.703" ry="1.2556"/>
            <rect className={props.color} id="line_left" transform="rotate(135)" x="1.2924" y="-18.771" width="2.5113" height="12.703" ry="1.2556"/>
        </g>
    </svg>
)