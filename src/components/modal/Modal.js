import React, { forwardRef } from "react"
import "./Modal.css"

export const Modal = (React.forwardRef((props, ref) => (
     (
        <section ref={ref} className="background__modal">
            <article className="modal__content">
                <div className="modal__heading">
                    <button
                    onClick={e => {ref.current.className = "background__modal"}}
                    >CLOSE</button>
                </div>
                {props.contentFunction}
            </article>
        </section>
    )
)))