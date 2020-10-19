import React, { useContext, useRef, useEffect} from "react"
// import { useHistory as history } from "react-router-dom"
import { ProjectContext } from "./ProjectProvider"
// need to import project types
import "./ProjectForm.css"

export const ProjectForm = props => {
    // NOT using these scripts. Only creating form HTML
    // const { addProject } = useContext(ProjectContext)

    // const name = useRef(null)
    // const userId = +sessionStorage.getItem("userId")

    return (
        <form className="form__project">
            <h3 className="project__h3">Create New Project</h3>
            <fieldset>
                <label htmlFor="projectName">Project name: </label>
                <input type="text"
                id="projectName"
                name="name"
                placeholder="Project name"
                required
                autoFocus/>
            </fieldset>
            <fieldset>
                <label htmlFor="projectType">Project Type: </label>
                <select 
                id="projectType"
                name="projectId"
                required
                autoFocus>
                    <option value="0">Select a project type</option>
                    {/* Map over project types */}
                </select>
            </fieldset>
            <fieldset>
                <label htmlFor="projectGoal">Word count goal: </label>
                <input type="number"
                 id="projectGoal"
                 name="wordCountGoal"
                 placeholder="500"
                 required
                 autoFocus
                 />
                 {/* Have a tooltip saying 500 words is about 1 single-spaced page */}
            </fieldset>
            <fieldset>
                <label>Goal Frequency: </label>
                <input type="radio" id="daily" name="goalFrequency" value="daily" />
                <label htmlFor="daily">Daily</label>
                <input type="radio" id="weekly" name="goalFrequency" value="weekly" />
                <label htmlFor="weekly">Weekly</label>
                <input type="radio" id="monthly" name="goalFrequency" value="monthly" />
                <label htmlFor="monthly">Monthly</label>
            </fieldset>
            {/* BELOW IS GREYED OUT UNLESS WEEKLY OR MONTHLY */}
            <fieldset>
                <label htmlFor="daysPerFrequency">How many days per *WEEK*/*MONTH* do you plan on writing: </label>
                <input type="number"
                id="daysPerFrequency"
                name="daysPerFrequency"
                placeholder="5"
                required
                disabled={true}
                />
            </fieldset>
        </form>
    )
}