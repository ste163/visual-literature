import React, { useState, createContext } from "react"

export const SettingsContext = createContext()

export const SettingsProvider = props => {

    const [ settings, setSettings ] = useState([])

    const getSettings = (userId) => {
        return fetch(`http://localhost:8088/settings?userId=${userId}`)
        .then(response => response.json())
        .then(setSettings)
    }

    const updateSettings = settingsObj => {
        return fetch(`http://localhost:8088/settings/${settingsObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(settingsObj)
        })
        .then(() => {
            getSettings(settingsObj.userId)
        })
    }

    return (
        <SettingsContext.Provider value={{
            settings, getSettings, updateSettings
        }}>
            {props.children}
        </SettingsContext.Provider>
    )
}