import React from "react"

export const NoProgressCard = props => (
    <section className="card card__color--white card__noDefault">
        <h2 className="noDefault__h2">No progress for</h2>
        <h3 className="noDefault__h3">{props.props.name}</h3>
        <p className="noDefault__p">Add <strong>progress</strong> to begin.</p>
        <button className="btn btn__noDefault"
        onClick={e => e.target.parentNode.parentNode.parentNode.childNodes[0].children[1].className = "background__modal modal__active"}>
            Add progress
        </button>
    </section>
)