import React, { useRef, useEffect, useContext } from "react"
import { useParams, useHistory } from "react-router-dom"
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
    const { projectId } = useParams()

    const { getTypes } = useContext(TypeContext)
    const { projects, getProjects, getProjectByParam } = useContext(ProjectContext)
    const { progress, getProgressByProjectId, getProgressByUserId } = useContext(ProgressContext)

    console.log(projects)
    console.log(progress)

    useEffect(() => {
        getTypes()
        .then(() => {
            if (projectId) {
                getProjectByParam(projectId)
                .then(getProgressByProjectId(projectId))
            } else {
                getProjects(activeUser)
                .then(getProgressByUserId(activeUser))
            }
        })
    }, [])

    return (
        <>
        <section className="view__header">

        {/* SELECT INPUT THAT POPULATES DROP DOWNS BASED ON AVAILABLE DATA.
        WILL NEED COMPLEX MAP FUNCTION TO CREATE SELECTS */}

        DISPLAY BY SELECTED DATE

        <IconDivider color="icon__lightGray" />

            <button className="project__btn"
            onClick={e => progressModal.current.className = "background__modal modal__active"}>
                <IconPlus color="icon__gray" />
                Add Progress
            </button>

        </section>

        <section className="view__container">
            
            {/* <Modal ref={progressModal} contentFunction={<ProgressForm />} width={"modal__width--wide"}/> */}
            
        </section>
        </>
    )
}