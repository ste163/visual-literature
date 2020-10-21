import React, { forwardRef } from "react"
import { IconClose } from "../icons/IconClose"
import "./Modal.css"

export const Modal = (React.forwardRef((props, ref) => (
     (
        <section ref={ref} className="background__modal">
            <article className={`modal__container ${props.width}`}>
                <section className="modal__heading">
                    <button className="modal__close"
                    onClick={e => {ref.current.className = "background__modal"}}>
                        <IconClose color="icon__gray" />
                    </button>
                </section>
                <section className="modal__content">
                    {props.contentFunction}
                </section>
            </article>
        </section>
    )
)))