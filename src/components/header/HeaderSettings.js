import React, { useContext, useEffect, useState } from "react"
import { SettingsContext } from "../settings/SettingsProvider"
import { ProjectContext } from "../projects/ProjectProvider"
import { HeaderColorMode } from "./HeaderColorMode"

export const HeaderSettings = () => {

    // Default settings from session storage
    const userId = parseInt(sessionStorage.getItem("userId"))
    const defaultView = sessionStorage.getItem("defaultView")
    const defaultProject = sessionStorage.getItem("defaultProject")
    const colorMode = sessionStorage.getItem("colorMode")

    const defaultSettings = {
        userId,
        defaultView,
        defaultProject,
        colorMode
    }

    const [ currentSettings, setCurrentSettings ] = useState(defaultSettings)
    
    const { settings, getSettings, updateSettings } = useContext(SettingsContext)
    const { projects, getProjects } = useContext(ProjectContext)
    
    const handleControlledInputChange = e => {
        const newSetting = {...settings[0]}
        newSetting[e.target.name] = e.target.value
        setCurrentSettings(newSetting)
    }

    useEffect(() => {
        getProjects(userId)
        .then(() => {
            getSettings(userId)
            HeaderColorMode()
        })
    }, [])

    // Wait for state to change, then update
    useEffect(() => {
        if (settings[0] !== undefined) {
            updateSettings({
                id: settings[0].id,
                userId: userId,
                defaultView: currentSettings.defaultView,
                defaultProject: +currentSettings.defaultProject,
                colorMode: currentSettings.colorMode
            })
            sessionStorage.setItem("defaultView", currentSettings.defaultView)
            sessionStorage.setItem("defaultProject", +currentSettings.defaultProject) 
            sessionStorage.setItem("colorMode", currentSettings.colorMode)
            HeaderColorMode()
        }
    }, [currentSettings])

    return (
        <>
        {settings[0] === undefined ? null : 
            <>
            <div className="container__settings">
                <h2 className="modal__h2">Settings</h2>
                <form className="form__settings">
                    <fieldset className="settings__fieldset">
                        <label htmlFor="defaultView">Set default view:</label>
                        <select
                        id="defaultView"
                        name="defaultView"
                        value={settings[0].defaultView}
                        onChange={handleControlledInputChange}>
                            <option value="/projects">Projects</option>
                            <option value="/table">Table</option>
                            <option value="/dashboard">Dashboard</option>
                        </select>
                        
                    </fieldset>
                    <fieldset className="settings__fieldset">
                        <label htmlFor="defaultProject">Set default project:</label>
                        <select
                        id="defaultProject"
                        name="defaultProject"
                        value={settings[0].defaultProject}
                        onChange={handleControlledInputChange}>
                            <option value="0">Select default project</option>
                            {projects.map(project => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                    </fieldset>
                    <fieldset className="settings__fieldset">
                        <label htmlFor="darkMode">Color mode:</label>
                        <div className="radios">
                            <input className="input__radio" type="radio" id="light" name="colorMode" value="light" required
                            checked={settings[0].colorMode === "light" ? "light" : ""}
                            onChange={handleControlledInputChange}
                            />
                            <label htmlFor="daily">Light</label>
                            
                            <input className="input__radio" type="radio" id="dark" name="colorMode" value="dark" required
                            checked={settings[0].colorMode === "dark" ? "dark" : ""}
                            onChange={handleControlledInputChange}
                            />
                            <label htmlFor="weekly">Dark</label>
                        </div>
                    </fieldset>
                </form>
            </div>
            <button className="btn"
            onClick={e => e.currentTarget.parentElement.parentElement.parentElement.className = "background__modal"}>Close</button>
            </>
        }
        </>
    )
}