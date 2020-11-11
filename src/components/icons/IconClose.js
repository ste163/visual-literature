import React from "react"
import "./Icons.css"

export const IconClose = props => (
    <svg className="icon__close" width="23" height="23" version="1.1" viewBox="0 0 6.0855 6.0855" xmlns="http://www.w3.org/2000/svg">
        <title>Close Icon</title>
        <g transform="matrix(.43505 -.43505 .43505 .43505 -6.1659 3.0428)">
            <rect className={props.color} id="line_vert" x="9.3277" y="4.2316" width="2.5113" height="12.703" ry="1.2556"/>
            <rect className={props.color} id="line_horz" transform="rotate(90)" x="9.3277" y="-16.935" width="2.5113" height="12.703" ry="1.2556"/>
        </g>
    </svg>
)