import React from "react"
import { Link } from "react-router-dom"
import { IconTable } from "../icons/IconTable"

// Create link to table button for dashboard
export const LinkTable = props => (
    <Link to={`/table/${props.props}`}>
        <button className="btn"
        onMouseOver={e => {
            const svgs = [...e.currentTarget.firstElementChild.children]
            svgs.forEach(svg => {
                    svg.classList.remove("icon__black")
                    svg.classList.add("icon__white")
                })
            }}
            onMouseOut={e => {
                const svgs = [...e.currentTarget.firstElementChild.children]
                svgs.forEach(svg => {
                    svg.classList.remove("icon__white")
                    svg.classList.add("icon__black")
                })
            }}>
            <IconTable location="icon__table--link" color="icon__black" />
        </button>
    </Link>
)