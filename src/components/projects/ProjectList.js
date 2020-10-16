import React, { useEffect, useContext } from "react"
import { ProjectContext } from "./ProjectProvider"
import { ProjectForm } from "./ProjectForm"

export const ProjectList = () => {
    const { projects, getProjects } = useContext(ProjectContext)
    const activeUser = +sessionStorage.getItem("userId")

    useEffect(() => {
        getProjects(activeUser)
    }, [])

    return (
        <section>
            <h2>Projects</h2>
            <ProjectForm />
            <p>LIST OF ALL CURRENT PROJECTS</p>
        </section>
    )
}