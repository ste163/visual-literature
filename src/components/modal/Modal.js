import React from "react"
import "./Modal.css"

export const Modal = (props) => {

    return (
        <section ref={props.ref} className="background__modal">
            <article className="modal__content">
                <div className="modal__heading">
                    <button>CLOSE</button>
                </div>
                {props.contentFunction}
            </article>
        </section>
    )
}