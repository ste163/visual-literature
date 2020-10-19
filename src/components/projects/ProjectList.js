import React, { useEffect, useContext } from "react"
import { ProjectContext } from "./ProjectProvider"
import { ProjectForm } from "./ProjectForm"
import "./Project.css"

export const ProjectList = () => {
    const { projects, getProjects } = useContext(ProjectContext)
    const activeUser = +sessionStorage.getItem("userId")

    useEffect(() => {
        getProjects(activeUser)
    }, [])

    return (
        <>

        <section className="view__header">
            <button className="project__btn">Create new project</button>
        </section>

        <section className="view__container">
            <ProjectForm />
            <p>LIST OF ALL CURRENT PROJECTS</p>
        </section>
        
        </>
    )
}