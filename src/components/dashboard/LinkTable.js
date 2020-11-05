import React from "react"
import { Link } from "react-router-dom"
import { IconTable } from "../icons/IconTable"

export const LinkTable = props => (
    <section className="card card__color--white card__link card__link--dash">
    <Link className="table__link" to={`/table/${props.props}`}>
        <button className="card__btn"
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
            <IconTable location="icon__table--link" color="icon__gray" />
        </button>
    </Link>
</section>
)