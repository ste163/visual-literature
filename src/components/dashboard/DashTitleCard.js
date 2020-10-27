import React from "react"

export const DashTitleCard = (props) => {
    return (
        <section className="card card__color--white card__dash">
            <h2 className="dash__title">{props.props !== undefined ? props.props.name : null}</h2>
        </section>
    )
}