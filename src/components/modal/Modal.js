import React, { forwardRef } from "react"
import { IconClose } from "../icons/IconClose"
import "./Modal.css"

export const Modal = (React.forwardRef((props, ref) => (
     (
        <section ref={ref} className="background__modal">
            <article className="modal__content">
                <div className="modal__heading">
                    <button className="modal__close"
                    onClick={e => {ref.current.className = "background__modal"}}>
                        <IconClose color="icon__gray" />
                    </button>
                </div>
                {props.contentFunction}
            </article>
        </section>
    )
)))