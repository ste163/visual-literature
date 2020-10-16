import React, { useEffect } from "react"
import { ProjectContext } from "./ProjectProvider"

export const ProjectList = () => {
    const { projects, getProjects } = useContext(ProjectContext)
    const activeUser = +sessionStorage.getItem("userId")

    useEffect(() => {
        getProjects(activeUser)
    }, [])

    return (
        <section>
            <h2>Projects</h2>
            <p>PROJECT FORM GOES HERE</p>
            <p>LIST OF ALL CURRENT PROJECTS</p>
        </section>
    )
}