import React, { useRef, useEffect, useContext } from "react"
import { ProjectContext } from "./ProjectProvider"
import { ProjectForm } from "./ProjectForm"
import { ProjectCard } from "./ProjectCard"
import { Modal } from "../modal/Modal"
import "./Project.css"
import { IconPlus } from "../icons/IconPlus"
import { IconDivider } from "../icons/IconDivider"

export const ProjectList = () => {
    const { projects, getProjects } = useContext(ProjectContext)
    const activeUser = +sessionStorage.getItem("userId")
    
    const modal = useRef()

    useEffect(() => {
        getProjects(activeUser)
    }, [])

    return (
        <>

        <section className="view__header">
            <button className="project__btn"
            onClick={e => {modal.current.className = "background__modal modal__active"}}>
                <IconPlus color="icon__gray" />
                Create new project
            </button>
            <IconDivider color="icon__lightGray" />
            Sort view
            <IconDivider color="icon__lightGray" />
            Cool Info About All Your Projects
        </section>

        <section className="view__container">
            <Modal ref={modal} contentFunction={<ProjectForm />} />
            <div className="project__cards">
                {
                    projects.map(project => {
                        return <ProjectCard key={project.id} project={project} />
                    })
                }
            </div>
        </section>
        
        </>
    )
}