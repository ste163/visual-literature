import React, { forwardRef } from "react"
import { IconDots } from "../icons/IconDots"

export const DotMenu = (React.forwardRef((props, ref) => (
    <section className="dot__menu">
        <button 
        className="card__btn"
        onClick={e => {
            if (ref.current.className === "dot__btns--inactive") {
                ref.current.className = "dot__btns--active"
            } else {
                ref.current.className = "dot__btns--inactive"
            }
        }}
        >
            <IconDots color="icon__gray"
        /></button>
        <div ref={ref} className="dot__btns--inactive">
            <button className="dot__btn"
            >Edit</button>
            <button className="dot__btn">Delete</button>
        </div>
    </section>
)))
