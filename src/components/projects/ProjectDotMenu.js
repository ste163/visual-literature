import React, { useRef, forwardRef, useContext } from "react"
import { IconDots } from "../icons/IconDots"
import { Modal } from "../modal/Modal"
import { ProjectForm } from "./ProjectForm"
import { ProjectContext } from "./ProjectProvider"
import "./ProjectDotMenu.css"

export const DotMenu = (React.forwardRef((props, ref) => {

    const { deleteProject } = useContext(ProjectContext);

    const deleteModal = useRef()
    const editModal = useRef()  

    const DeleteWarning = () => (
        <>
            <h2 className="modal__warning">Warning</h2>
            <p className="warning__p">Deleting a project is permanent.</p>
            <button className="btn btn--red"
            onClick={e => deleteProject(props.project.userId, props.project.id)}>
                Delete
            </button>
        </>
    )
        
    return (
    <section className="dot__menu"
    onMouseLeave={e => {
        if (ref.current.className === "dot__btns--active") {
            ref.current.className = "dot__btns--inactive"
        }
    }}>

        <Modal ref={editModal} contentFunction={<ProjectForm props={props.project}/>} width={"modal__width--wide"}/> 
       
        <Modal ref={deleteModal} contentFunction={<DeleteWarning/>} width={"modal__width--small"}/>
        
        <button 
        className="card__btn"
        onClick={e => ref.current.className === "dot__btns--inactive" ? ref.current.className = "dot__btns--active" : ref.current.className = "dot__btns--inactive" }
        onMouseOver={e => {
        e.currentTarget.firstElementChild.children[1].childNodes.forEach(svg => {
                svg.classList.remove("icon__gray")
                svg.classList.add("icon__hovered")
            })
        }}
        onMouseOut={e => {
            e.currentTarget.firstElementChild.children[1].childNodes.forEach(svg => {
                svg.classList.remove("icon__hovered")
                svg.classList.add("icon__gray")
            })
        }}>
            <IconDots color="icon__gray"/>
        </button>
        
        <div ref={ref} className="dot__btns--inactive"
        onMouseLeave={e => ref.current.className = "dot__btns--inactive"}>
            
            <button className="dot__btn"
            onClick={e => editModal.current.className = "background__modal modal__active"}
            >
                Edit
            </button>
            
            <button className="dot__btn"
            onClick={e => deleteModal.current.className = "background__modal modal__active"}>Delete</button>
        
        </div>
    </section>
)}))