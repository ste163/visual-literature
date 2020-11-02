import React from "react"
import { ProjectContext } from "../projects/ProjectProvider"

export const HeaderSettings = () => {

    return (
        <>
        <div className="container__settings">
            <h2 className="modal__h2">Settings</h2>
            <form className="form__settings">
                <fieldset className="settings__fieldset">
                    <label htmlFor="defaultPage">Set default landing page:</label>
                    <select
                    id="defaultPage"
                    name="defaultPage">
                        <option value="0">Projects</option>
                        <option value="1">Table</option>
                        <option value="2">Dashboard</option>
                    </select>
                    
                </fieldset>
                <fieldset className="settings__fieldset">
                    <label htmlFor="defaultProject">Set default project:</label>
                    <select
                    id="defaultProject"
                    name="defaultProject">
                        <option value="0">Select default project</option>
                        {/* {projects.map(project => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))} */}
                    </select>
                </fieldset>
                <fieldset className="settings__fieldset">
                    Dark mode
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
    )
}