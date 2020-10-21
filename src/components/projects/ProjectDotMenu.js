import React, { useRef, forwardRef } from "react"
import { IconDots } from "../icons/IconDots"
import { Modal } from "../modal/Modal"



export const DotMenu = (React.forwardRef((props, ref) => {

    const modal = useRef()  

    const DeleteWarning = () => (
        <>
            <h2 className="modal__warning">Warning</h2>
            <p>Deleting a project is permanent. Confirm deletion.</p>
            <button className="btn btn--orange"
            onClick={e => {
                console.log("DELETE", props.project)
            }}>
                Confirm</button>
        </>
    )
        
    return (
    <section className="dot__menu">
        <button 
        className="card__btn"
        onClick={e => {
            if (ref.current.className === "dot__btns--inactive") {
                ref.current.className = "dot__btns--active"
            } else {
                ref.current.className = "dot__btns--inactive"
            }
        }}
        >
            <IconDots color="icon__gray"
        /></button>
        <div ref={ref} className="dot__btns--inactive">
            <button className="dot__btn"
            onClick={e => {
                console.log("EDIT", props.project)
            }}>
                Edit</button>
            <button className="dot__btn"
            onClick={e => {
                modal.current.className = "background__modal modal__active"
            }}>
                Delete</button>
                <Modal ref={modal} contentFunction={<DeleteWarning/>} width={"modal__width--small"}/>
        </div>
    </section>
)}))