import React, { useState, createContext } from "react"

export const ProgressContext = createContext()

export const ProgressProvider = props => {
    
    const [ progress, setProgress ] = useState([])

    const getProgressByUserId = userId => {
        return fetch(`http://localhost:8088/progress?userId=${userId}&_expand=project`)
        .then(response => response.json())
        .then(setProgress)
    }

    const getProgressByProjectId = projectId => {
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
            getProgressByProjectId(progressObj.projectId)
        })
    }

    const updateProgress = progressObj => {
        return fetch(`http://localhost:8088/progress/${progressObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(progressObj)
        })
        .then(() => {
            getProgressByProjectId(progressObj.projectId)
        })
    }

    const deleteProgress = (projectId, progressId) => {
        return fetch(`http://localhost:8088/progress/${progressId}`, {
            method: "DELETE"
        })
        .then(() => {
            getProgressByProjectId(projectId)
        })
    }

    return (
        <ProgressContext.Provider value={{
            progress, getProgressByUserId, getProgressByProjectId, addProgress, updateProgress, deleteProgress
        }}>
            {props.children}
        </ProgressContext.Provider>
    )
}