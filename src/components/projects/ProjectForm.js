import React, { useContext, useRef, useEffect} from "react"
// import { useHistory as history } from "react-router-dom"
import { ProjectContext } from "./ProjectProvider"
// need to import project types

export const ProjectForm = props => {
    // NOT using these scripts. Only creating form HTML
    // const { addProject } = useContext(ProjectContext)

    // const name = useRef(null)
    // const userId = +sessionStorage.getItem("userId")

    return (
        <form>
            <h3>Create New Project</h3>
            <fieldset>
                <label htmlFor="projectName">Project name: </label>
                <input type="text"
                id="projectName"
                name="name"
                placeholder="Project name"
                required
                autofocus/>
            </fieldset>
        </form>
    )
}