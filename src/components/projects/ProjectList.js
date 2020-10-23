import React, { useRef, useEffect, useState, useContext } from "react"
import { ProjectContext } from "./ProjectProvider"
import { TypeContext } from "../type/TypeProvider"
import { ProjectForm } from "./ProjectForm"
import { ProjectCard } from "./ProjectCard"
import { Modal } from "../modal/Modal"
import { IconPlus } from "../icons/IconPlus"
import { IconDivider } from "../icons/IconDivider"
import "./Project.css"

export const ProjectList = () => {
    const { projects, getProjects } = useContext(ProjectContext)
    // We getTypes for the forms on ProjectList load instead of calling it for each form
    // If types ever change, the project list will reload anyway, so forms will known.
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

// TESTS TO FIX CRASH ON ADD

// projects.map(project => {
//     return <ProjectCard key={project.id} project={project} />
// })

// Array.isArray(projects) ? 
// projects.map(project => <ProjectCard key={project.id} project={project} /> ) : 
// <ProjectCard key={projects.id} project={projects} />