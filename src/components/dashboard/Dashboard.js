import React, { useRef, useEffect, useContext } from "react"
import { ProgressContext } from "../progress/ProgressProvider"
import { ProjectContext } from "../projects/ProjectProvider"
import { TypeContext } from "../type/TypeProvider"
import { ProgressForm } from "../progress/ProgressForm"
import { Modal } from "../modal/Modal"
import { IconPlus } from "../icons/IconPlus"
import { IconDivider } from "../icons/IconDivider"
import "./Dashboard.css"

export const Dashboard = () => {

    const activeUser = +sessionStorage.getItem("userId")
    const progressModal = useRef()

    const { getTypes } = useContext(TypeContext)
    const { projects, getProjects } = useContext(ProjectContext)
    const { getProgressByProjectId } = useContext(ProgressContext)

    useEffect(() => {
        getTypes()
        .then(getProjects(activeUser))
    }, [])

    return (
        <>
        <section className="view__header">

            <button className="project__btn"
            onClick={e => progressModal.current.className = "background__modal modal__active"}>
                <IconPlus color="icon__gray" />
                Add Progress
            </button>

            <IconDivider color="icon__lightGray" />
            Sort view

            <IconDivider color="icon__lightGray" />
            Cool Info About All Your Projects

        </section>

        <section className="view__container">
            
            {/* <Modal ref={progressModal} contentFunction={<ProgressForm />} width={"modal__width--wide"}/> */}
            
        </section>
        </>
    )
}