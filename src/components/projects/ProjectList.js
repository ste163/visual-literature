import React, { useRef, useEffect, useState, useContext } from "react"
import { TypeContext } from "../type/TypeProvider"
import { ProjectContext } from "./ProjectProvider"
import { ProgressContext } from "../progress/ProgressProvider"
import { ProjectForm } from "./ProjectForm"
import { ProjectCard } from "./ProjectCard"
import { Modal } from "../modal/Modal"
import { IconPlus } from "../icons/IconPlus"
import { IconDivider } from "../icons/IconDivider"
import "./Project.css"

export const ProjectList = () => {
    const { projects, getProjects } = useContext(ProjectContext)

    const { progress, getProgressByUserId } = useContext(ProgressContext)
    
    // We getTypes for the forms on ProjectList load.
    // Types currently WILL NEVER change, so forms don't need the fetch.
    const { getTypes } = useContext(TypeContext)
    const activeUser = +sessionStorage.getItem("userId")
    
    const modal = useRef()

    // TO DO
    // On initial load, get projects and current progress
    // When the user clicks edit, need to get Projects again
    // So it's always the latest data from database and doesn't save
    // their un-edited form changes

    // Get latest progress in that form as well
    // It'll be an extra request, but should
    // have less issues with always being the most up-to-date data
    useEffect(() => {
        getTypes()
        .then(getProjects(activeUser))
        .then(getProgressByUserId(activeUser))
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
            
            <Modal ref={modal} contentFunction={<ProjectForm />} width={"modal__width--wide"}/>
            
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