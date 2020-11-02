import React, { useContext, useEffect, useState } from "react"
import { SettingsContext } from "../settings/SettingsProvider"
import { ProjectContext } from "../projects/ProjectProvider"

export const HeaderSettings = () => {

    const userId = parseInt(sessionStorage.getItem("userId"))

    // SET DEFAULT STATE FROM SESSION STORAGE
    const defaultSettings = {
        userId,
        defaultPage: "/projects",
        defaultProject: 0,
        colorMode: "light"
    }

    const [ currentSettings, setCurrentSettings ] = useState(defaultSettings)
    
    const { settings, getSettings, updateSettings } = useContext(SettingsContext)
    const { projects, getProjects } = useContext(ProjectContext)
    
    console.log("STATE", currentSettings)
    
    const handleControlledInputChange = e => {
        const newSetting = {...settings[0]}
        newSetting[e.target.name] = e.target.value
        setCurrentSettings(newSetting)
    }

    useEffect(() => {
        getProjects(userId)
        .then(getSettings(userId))
    }, [])

    // Wait for state to change, then update
    useEffect(() => {
        if (settings[0] !== undefined) {
            updateSettings({
                id: settings[0].id,
                userId: userId,
                defaultPage: currentSettings.defaultPage,
                defaultProject: +currentSettings.defaultProject,
                colorMode: currentSettings.colorMode
            })
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
                        <label htmlFor="defaultPage">Set default landing page:</label>
                        <select
                        id="defaultPage"
                        name="defaultPage"
                        value={settings[0].defaultPage}
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
                        <label htmlFor="darkMode">View mode:</label>
                        <div className="radios">
                            <input className="input__radio" type="radio" id="light" name="colorMode" value="light" required
                            checked={settings[0].colorMode === "light" ? "light" : ""}
                            onChange={handleControlledInputChange}
                            />
                            <label htmlFor="daily">Light mode</label>
                            
                            <input className="input__radio" type="radio" id="dark" name="colorMode" value="dark" required
                            checked={settings[0].colorMode === "dark" ? "dark" : ""}
                            onChange={handleControlledInputChange}
                            />
                            <label htmlFor="weekly">Dark mode</label>
                        </div>
                    </fieldset>
                    <fieldset className="settings__fieldset">
                        <button 
                        type="button"
                        className="btn btn--red">
                            Delete Account
                        </button>
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