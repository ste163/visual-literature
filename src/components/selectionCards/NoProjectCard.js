import React from "react"

export const NoProjectCard = () => (
    <section className="card card__color--white card__noDefault">
        <h2 className="noDefault__h2">No project created</h2>
        <p className="noDefault__p">Create a <strong>project</strong> to begin using <strong>VISLIT</strong>.</p>
        <button className="btn btn__noDefault"
        onClick={e => {e.target.parentNode.parentNode.parentNode.childNodes[0].className = "background__modal modal__active"}}>
            Create new project
        </button>
    </section>
)