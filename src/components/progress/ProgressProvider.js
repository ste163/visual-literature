import React, { useState, createContext } from "react"

export const ProgressContext = createContext()

export const ProgressProvider = props => {
    
    const [ progress, setProgress ] = useState([])

    const getProgressByUserId = userId => {
        return fetch(`http://localhost:8088/progress?userId=${userId}&_expand=project`)
        .then(response => response.json())
        .then(setProgress)
    }

    const getProgressByProject = projectId => {
        return fetch(`http://localhost:8088/progress?projectId=${projectId}&_expand=project`)
        .then(response => response.json())
        .then(setProgress)
    }

    const addProgress = progressObj => {
        return fetch(`http://localhost:8088/progress/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(progressObj)
        })
        .then(() => {
            getProgressByProject(progressObj.projectId)
        })
    }

    return (
        <ProgressContext.Provider value={{
            progress, getProgressByUserId, getProgressByProject, addProgress
        }}>
            {props.children}
        </ProgressContext.Provider>
    )
}