import React, { useState, createContext } from "react"

export const ProjectContext = createContext()

export const ProjectProvider = props => {

    const [projects, setProject] = useState([])

    const getProjects = userId => {
        return fetch(`http://localhost:8088/projects/?userId=${userId}&_expand=type`)
        .then(response => response.json())
        .then(setProject)
    }

    const getProjectByParam = (projectId) => {
        return fetch(`http://localhost:8088/projects/${projectId}`)
        .then(response => response.json())
        .then(setProject)
    }

    const getProjectById = projectObj => {
        return fetch(`http://localhost:8088/projects/${projectObj.id}`)
        .then(response => response.json())
        .then(getProjects(projectObj.userId))
    }

    const addProject = projectObj => {
        return fetch("http://localhost:8088/projects/", {
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

    const deleteProject = (userId, projectId) => {
        return fetch(`http://localhost:8088/projects/${projectId}`, {
            method: "DELETE"
        })
        .then(() => {
            getProjects(userId)
        })
    }

    const updateProject = projectObj => {
        return fetch(`http://localhost:8088/projects/${projectObj.id}`, {
            method: "PUT",
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
            projects, getProjects, getProjectById, getProjectByParam, addProject, deleteProject, updateProject
        }}>
            {props.children}
        </ProjectContext.Provider>
    )
}