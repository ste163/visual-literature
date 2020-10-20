import React from "react"
import "./Icons.css"

export const IconPlus = props => {
    return (
        <svg className="icon__plus" width="30" height="30" version="1.1" viewBox="0 0 7.9376 7.9376" xmlns="http://www.w3.org/2000/svg">
            <title>Plus Icon</title>
            <g transform="matrix(.61526 0 0 .61526 -2.5428 -2.5426)">
                <rect className={props.color} id="plus_vert" x="9.3277" y="4.2316" width="2.5113" height="12.703" ry="1.2556"/>
                <rect className={props.color} id="plus_horz" transform="rotate(90)" x="9.3277" y="-16.935" width="2.5113" height="12.703" ry="1.2556"/>
            </g>
        </svg>
    )
}