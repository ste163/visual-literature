import React, { useRef, useEffect, useState, useContext } from "react"
import { ProjectContext } from "./ProjectProvider"
import { ProjectForm } from "./ProjectForm"
import { ProjectCard } from "./ProjectCard"
import { Modal } from "../modal/Modal"
import { IconPlus } from "../icons/IconPlus"
import { IconDivider } from "../icons/IconDivider"
import "./Project.css"

export const ProjectList = () => {
    const { projects, getProjects } = useContext(ProjectContext)
    const activeUser = +sessionStorage.getItem("userId")
    
    const modal = useRef()

    // POSSIBLE FIX?
    // check if projects is an array, if it is, set it to itself
    // if it's not, push into an empty array

    useEffect(() => {
        getProjects(activeUser)
    }, [])

    // I know the issue is:
    // When we add a new project, it comes back as an object
    // instead of an array. You can not map over an object.
    // Therefore, we need to either convert the object to an array
    // or handle rendering the object different than the map
    
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

// TESTS TO FIX CRASH ON ADD

// projects.map(project => {
//     return <ProjectCard key={project.id} project={project} />
// })

// Array.isArray(projects) ? 
// projects.map(project => <ProjectCard key={project.id} project={project} /> ) : 
// <ProjectCard key={projects.id} project={projects} />