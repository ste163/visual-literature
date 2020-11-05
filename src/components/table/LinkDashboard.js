import React from "react"
import { Link } from "react-router-dom"
import { IconGraph } from "../icons/IconGraph"

export const LinkDashboard = props => (
    <section className="card card__color--white card__link">
        <Link className="table__link" to={`/dashboard/${props.props}`}
        onMouseOver={e => {
        const svgs = [...e.currentTarget.firstElementChild.children]
        svgs.forEach(svg => {
                svg.classList.remove("icon__gray")
                svg.classList.add("icon__hovered")
            })
        }}
        onMouseOut={e => {
            const svgs = [...e.currentTarget.firstElementChild.children]
            svgs.forEach(svg => {
                svg.classList.remove("icon__hovered")
                svg.classList.add("icon__gray")
            })
        }}>
            <IconGraph location="icon__graph--link" color="icon__gray" />
            <h3 className="table__h3--link">View on dashboard</h3>
        </Link>
    </section>
)