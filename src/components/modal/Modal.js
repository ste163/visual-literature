import React, { forwardRef } from "react"
import { IconClose } from "../icons/IconClose"
import "./Modal.css"

// To use Modal
    // Add props for width (see Modal.css for all):
        // modal__width--small
        // modal__width--wide
    // Add content with
        // contentFunction
    // Add fetch request on close with
        // fetchFunction
        
export const Modal = (React.forwardRef((props, ref) => (
     (
        <section ref={ref} className="background__modal"
        onClick={e => {
            // If you click off the background, close modal
           if (e.target.className === "background__modal modal__active") {
            ref.current.className = "background__modal"
            if (props.fetchFunction) {
                props.fetchFunction(props.projectId)
            }
           }
        }}>

            <article className={`modal__container ${props.width}`}>

                <section className="modal__heading">

                    <button className="modal__close"
                    onClick={e => {
                        ref.current.className = "background__modal"
                        if (props.fetchFunction) {
                            props.fetchFunction(props.projectId)
                        }
                    }}>
                        <IconClose color="icon__gray" /></button>

                </section>

                <section className="modal__content">
                    {props.contentFunction}                
                </section>

            </article>

        </section>
    )
)))