import React from "react"
import { Link } from "react-router-dom"
import { IconGraph } from "../icons/IconGraph"

export const LinkDashboard = props => (
        <Link to={`/dashboard/${props.props}`}>
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
                <IconGraph location="icon__graph--link" color="icon__black" />
            </button>
        </Link>
)