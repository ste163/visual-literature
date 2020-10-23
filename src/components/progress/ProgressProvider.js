import React, { useState, createContext } from "react"

export const ProgressContext = createContext()

export const ProgressProvider = props => {
    
    const [ progress, setProgress ] = useState([])

    // getProgress fetches all of a user's progress
    const getProgress = userId => {
        return fetch(`http://localhost:8088/progress?userId=${userId}`)
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
            getProgress(progressObj.projectId)
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