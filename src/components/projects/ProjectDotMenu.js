import React, { forwardRef } from "react"
import { IconDots } from "../icons/IconDots"

export const DotMenu = (React.forwardRef((props, ref) => (
    <section ref={ref} className="dot__menu">
        <button 
        className="card__btn project__dots"
        onClick={e => {
            console.log("CLICKED")
        }}
        >
            <IconDots color="icon__gray"
        /></button>
        <div className="dot__btns">
            <button className="dot__btn"
            >Edit</button>
            <button className="dot__btn">Delete</button>
        </div>
    </section>
)))
