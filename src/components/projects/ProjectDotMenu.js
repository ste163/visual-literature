import React, { useRef, forwardRef } from "react"
import { IconDots } from "../icons/IconDots"
import { Modal } from "../modal/Modal"
import { ProjectForm } from "./ProjectForm"



export const DotMenu = (React.forwardRef((props, ref) => {

    const deleteModal = useRef()
    const editModal = useRef()  

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
        }}>
            <IconDots color="icon__gray"/>
        </button>
        
        <div ref={ref} className="dot__btns--inactive">
            
            <button className="dot__btn"
            onClick={e => {
                console.log("EDIT", props.project)
                editModal.current.className = "background__modal modal__active"
            }}>
                Edit</button>
                <Modal ref={editModal} contentFunction={<ProjectForm props={props.project}/>} width={"modal__width--wide"}/> 
            <button className="dot__btn"
            onClick={e => {
                deleteModal.current.className = "background__modal modal__active"
            }}>
                Delete</button>
                <Modal ref={deleteModal} contentFunction={<DeleteWarning/>} width={"modal__width--small"}/>
        </div>
    </section>
)}))