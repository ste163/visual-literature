import React from "react"
import { Link } from "react-router-dom"
import { IconTable } from "../icons/IconTable"

export const LinkTable = props => (
    <section className="card card__color--white card__link card__link--dash">
    <Link className="table__link" to={`/table/${props.props}`}>
        <IconTable location="icon__table--link" color="icon__gray" />
        <h3 className="table__h3--link">View table</h3>
    </Link>
</section>
)