import React, { useContext, useEffect, useState } from "react"
import { SettingsContext } from "../settings/SettingsProvider"
import { ProjectContext } from "../projects/ProjectProvider"

export const HeaderSettings = () => {

    const userId = sessionStorage.getItem("userId")

    const [ settingState, setSettingState ] = useState()
    
    const { settings, getSettings, updateSettings } = useContext(SettingsContext)
    const { projects, getProjects } = useContext(ProjectContext)
    console.log(settings[0])
    
    const handleControlledInputChange = e => {
        const newSetting = { ...settings }
        newSetting[e.target.name] = e.target.value
        // setSettingState(newSetting)
        // updateSettings(userId)
}

    useEffect(() => {
        getProjects(userId)
        .then(() => {
            getSettings(userId)
            .then(() => {
                setSettingState(settings)
            })
        })
    }, [])

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
                        onChange={handleControlledInputChange}>
                            <option value="0">Projects</option>
                            <option value="1">Table</option>
                            <option value="2">Dashboard</option>
                        </select>
                        
                    </fieldset>
                    <fieldset className="settings__fieldset">
                        <label htmlFor="defaultProject">Set default project:</label>
                        <select
                        id="defaultProject"
                        name="defaultProject"
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
                            <input className="input__radio" type="radio" id="light" name="goalFrequency" value="light" required
                            checked={settings[0].colorMode === "light" ? "light" : false}
                            onChange={handleControlledInputChange}
                            onClick={e => {
                                // setSelectedFreq(e.target.value)
                            }}
                            />
                            <label htmlFor="daily">Light mode</label>
                            
                            <input className="input__radio" type="radio" id="dark" name="goalFrequency" value="dark" required
                            // checked={settings.colorMode === "dark"}
                            onChange={handleControlledInputChange}
                            onClick={e => {
                                // setSelectedFreq(e.target.value)
                            }}
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