import React, { useState, createContext } from "react"

export const ProgressContext = createContext()

export const ProgressProvider = props => {

    const [progress, setProgress] = useState([])

    // Get progress by the project's ID because
    // projects are already assigned to users.
    const getProgress = projectId => {
        return fetch(`http://localhost:8088/progress?_projectId=${projectId}`)
        .then(response = response.json())
        .then(setProgress)
    }

    const addProgress = progressObj => {
        return fetch("http://localhost:8088/progress", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(progressObj)
        })
        .then(() => {
            getProjects(progressObj.projectId)
        })
    }

    return (
        <ProgressContext.Provider value={{
            progress, getProgress, addProgress
        }}>
            {props.children}
        </ProgressContext.Provider>
    )   
}