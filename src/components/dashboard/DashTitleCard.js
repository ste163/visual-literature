import React from "react"

export const DashTitleCard = (props) => {
    return (
        <section className="card card__color--white card__dash">
            <h2 className="dash__title">{props.props.name}</h2>
        </section>
    )
}