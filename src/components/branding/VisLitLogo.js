import React from "react"
import "./VisLitLogo.css"

// To use logo
    // Assign a location: login, header, footer
    // If you want animation, add property for each path
    // Path stroke with colorVis and colorLit 
    // Dot stroke and fill with: colorVisDot and colorLitDot

export const VisLitLogo = props => (
    <svg className={props.location} width="194" height="183" version="1.1" viewBox="0 0 51.329 48.419" xmlns="http://www.w3.org/2000/svg">
        <title>Visual Literature Logo</title>
        <path className={`${props.colorLit} ${props.animationLineL}`} id="line__l" d="m44.941 41.869-13.781 0.094461-9.6036-35.841" style={{fill:"none",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"4.6826"}}/>
        <path className={`${props.colorVis} ${props.animationLineV}`} id="line__v" d="m2.4641 23.852 8.2435 18.112 9.6036-35.841" style={{fill:"none",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"4.6826"}}/>
        <circle className={`${props.colorVisDot} ${props.animationDotV} `} id="dot__v" cx="21.014" cy="6.8446" r="4.3967" style={{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"4.6826"}}/>
        <circle className={`${props.colorLitDot} ${props.animationDotL}`} id="dot__l" cx="44.468" cy="41.574" r="4.3967" style={{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"4.6826"}}/>
    </svg>
)