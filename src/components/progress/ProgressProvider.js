import React, { useState, createContext } from "react"

export const ProgressContext = createContext()

export const ProgressProvider = props => {
    
    const [ progress, setProgress ] = useState([])
    const [ todaysProgress, setTodaysProgress ] = useState([])

    const getProgressByUserId = userId => {
        return fetch(`http://localhost:8088/progress?userId=${userId}&_expand=project`)
        .then(response => response.json())
        .then(setProgress)
    }

    const getProgressByProjectId = projectObj => {
        return fetch(`http://localhost:8088/progress?projectId=${projectObj.id}&_expand=project`)
        .then(response => response.json())
        .then(setProgress)
    }

    const getTodaysProgress = (todaysDate) => {
        return fetch(`http://localhost:8088/progress?dateEntered=${todaysDate}`)
        .then(response => response.json())
        .then(setTodaysProgress)
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
            getProgressByProjectId(progressObj.id)
        })
    }

    return (
        <ProgressContext.Provider value={{
            progress, todaysProgress, getProgressByUserId, getProgressByProjectId, getTodaysProgress, addProgress, updateProgress
        }}>
            {props.children}
        </ProgressContext.Provider>
    )
}