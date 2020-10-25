import React from "react"
import "./VisLitLogo.css"

// To use logo, need to assign a location (login, header, footer)
// and a colorLit and colorVis for those logo parts

export const VisLitLogo = props => {
    return (
        <svg className={props.location} width="194" height="183" version="1.1" viewBox="0 0 51.329 48.419" xmlns="http://www.w3.org/2000/svg">
            <title>Visual Literature Logo</title>
            <path className={props.colorLit} id="line__l" d="m44.941 41.869-13.781 0.094461-9.6036-35.841" style={{fill:"none",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"4.6826"}}/>
            <path className={props.colorVis} id="line__v" d="m2.4641 23.852 8.2435 18.112 9.6036-35.841" style={{fill:"none",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"4.6826"}}/>
            <circle className={props.colorVis} id="dot_v" cx="21.014" cy="6.8446" r="4.3967" style={{fill:"#f6f6f6",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"4.6826"}}/>
            <circle className={props.colorLit} id="dot_l" cx="44.468" cy="41.574" r="4.3967" style={{fill:"#f6f6f6",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"4.6826"}}/>
        </svg>
    )
}


