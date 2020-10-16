import React, { useState, createContext } from "react"

export const ProjectContext = createContext()

export const ProjectProvider = props => {

    const [projects, setProject] = useState([])

    const getProjects = userId => {
        const parsedUserId = +userId
        return fetch(`http://localhost:8088/projects/?userId=${parsedUserId}`)
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
        .then(setProject)
    }

    return (
        <ProjectContext.Provider value={{
            projects, getProjects, addProject
        }}>
            {props.children}
        </ProjectContext.Provider>
    )
}