import React, { useState, createContext } from "react"

export const ProjectContext = createContext()

export const ProjectProvider = props => {

    const [projects, setProject] = useState([])

    const getProjects = userId => {
        return fetch(`http://localhost:8088/projects/?userId=${userId}&_expand=type`)
        .then(response => response.json())
        .then(setProject)
    }

    const addProject = projectObj => {
        fetch("http://localhost:8088/projects/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projectObj)
        })
        .then(() => {
            getProjects(projectObj.userId)
        })
    }

    return (
        <ProjectContext.Provider value={{
            projects, getProjects, addProject
        }}>
            {props.children}
        </ProjectContext.Provider>
    )
}