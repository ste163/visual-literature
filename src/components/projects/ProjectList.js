import React, { useRef, useEffect, useContext } from "react"
import { TypeContext } from "../type/TypeProvider"
import { ProjectContext } from "./ProjectProvider"
import { ProgressProvider, ProgressContext } from "../progress/ProgressProvider"
import { ProjectForm } from "./ProjectForm"
import { ProjectCard } from "./ProjectCard"
import { Modal } from "../modal/Modal"
import { IconPlus } from "../icons/IconPlus"
import { IconDivider } from "../icons/IconDivider"
import "./Project.css"

export const ProjectList = () => {
    const { projects, getProjects } = useContext(ProjectContext)

    const { getProgressByUserId } = useContext(ProgressContext)
    
    // We getTypes for the forms on ProjectList load.
    // Types currently WILL NEVER change, so forms don't need the fetch.
    const { getTypes } = useContext(TypeContext)
    const activeUser = +sessionStorage.getItem("userId")
    
    const modal = useRef()

    useEffect(() => {
        getTypes()
        .then(getProjects(activeUser))
    }, [])

    return (
        <>
        <section className="view__header">

            <button className="project__btn"
            onClick={e => modal.current.className = "background__modal modal__active"}>
                <IconPlus color="icon__gray" />
                Create new project
            </button>

            <IconDivider color="icon__lightGray" />
            Sort view

            <IconDivider color="icon__lightGray" />
            Cool Info About All Your Projects

        </section>

        <section className="view__container">
            
            <Modal ref={modal} contentFunction={<ProjectForm />} width={"modal__width--widest"}/>

            <div className="project__cards">
                {                   
                        projects.map(project => {
                            return <ProgressProvider key={project.id}><ProjectCard key={project.id} project={project} /></ProgressProvider>
                        })               
                }
            </div>
            
        </section>
        </>
    )
}