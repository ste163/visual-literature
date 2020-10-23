import React, { useState, createContext } from "react"

export const ProgressContext = createContext()

export const ProgressProvider = props => {
    
    const [ progress, setProgress ] = useState([])

    const getProgress = projectId => {
        return fetch(`http://localhost:8088/progress/?projectId=${projectId}`)
        .then(response => response.json())
        .then(setProgress)
    }

    return (
        <ProgressContext.Provider value={{
            progress, getProgress
        }}>
            {props.children}
        </ProgressContext.Provider>
    )
}