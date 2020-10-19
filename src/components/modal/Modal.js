import React from "react"
import "./Modal.css"

export const Modal = (props) => {

    return (
        <section className="background__modal">
            <article className="modal__content">
                {props.contentFunction}
            </article>
        </section>
    )
}