import React, { useContext, useState, useRef, useEffect} from "react"
import { ProjectContext } from "./ProjectProvider"
import { TypeContext } from "../type/TypeProvider"
import "./ProjectForm.css"

export const ProjectForm = props => {

    const { addProject } = useContext(ProjectContext)
    const { types, getTypes } = useContext(TypeContext)

    const [ project, setProject ] = useState({})
    const [isLoading, setIsLoading ] = useState(true)

    const userId = +sessionStorage.getItem("userId")
    // Populates date picker with current date
    const currentDate = new Date()
    const convertedDate = currentDate.toISOString().slice(0,10)

    const handleControlledInputChange = e => {
        const newProject = { ...project }
        newProject[e.target.name] = e.target.value
        setProject(newProject)
    }

    useEffect(() => {
        getTypes().then(() => {
            setIsLoading(false);
        })
    }, [])

    const constructNewProject = () => {
        console.log("SUBMITTED")
    }

    const createProject = (e) => {
        e.preventDefault()
        constructNewProject()
    }

    return (
        <form className="form__project" onSubmit={createProject}>

            <h3 className="project__h3">Create New Project</h3>
            
            <h4 className="project__h4">Project Setup</h4>

            <fieldset>
                <label htmlFor="projectName">Project name: </label>
                <input type="text"
                onChange={handleControlledInputChange}
                id="projectName"
                name="name"
                placeholder="Project name"
                required
                autoFocus/>
            </fieldset>
            
            <fieldset>
                <label htmlFor="projectType">Project Type:</label>
                <select
                onChange={handleControlledInputChange}
                id="projectType"
                name="projectId"
                required
                autoFocus>
                    <option value="0">Select a project type</option>
                    {types.map(type => (
                        <option key={type.id} value={type.id}>
                            {type.name}
                        </option>
                    ))}
                </select>
            </fieldset>
            
            <fieldset>
                <label htmlFor="projectDate">Project Start Date:</label>
                <input type="date"
                onChange={handleControlledInputChange}
                id="projectDate"
                name="projectDate"
                defaultValue={convertedDate}
                />
            </fieldset>

            <h4 className="project__h4">Goal Setup</h4>

            <fieldset>
                <label htmlFor="projectGoal">Word count goal: </label>
                <input type="number"
                 onChange={handleControlledInputChange}
                 id="projectGoal"
                 name="wordCountGoal"
                 placeholder="500"
                 required
                 autoFocus
                 />
                 {/* Have a tooltip saying 500 words is about 1 single-spaced page */}
            </fieldset>
            
            <fieldset className="freq__radios">
                <label>Goal Frequency: </label>
                <div className="radios">
                    <input onChange={handleControlledInputChange} className="input__radio" type="radio" id="daily" name="goalFrequency" value="daily" />
                    <label htmlFor="daily">Daily</label>
                    <input onChange={handleControlledInputChange} className="input__radio" type="radio" id="weekly" name="goalFrequency" value="weekly" />
                    <label htmlFor="weekly">Weekly</label>
                    <input onChange={handleControlledInputChange} className="input__radio" type="radio" id="monthly" name="goalFrequency" value="monthly" />
                    <label htmlFor="monthly">Monthly</label>
                </div>
            </fieldset>
            
            {/* BELOW IS GREYED OUT UNLESS WEEKLY OR MONTHLY */}
            <fieldset className="freq__days">
                <label htmlFor="daysPerFrequency">How many days per *WEEK*/*MONTH* do you plan on writing: </label>
                <input type="number"
                onChange={handleControlledInputChange}
                id="daysPerFrequency"
                name="daysPerFrequency"
                placeholder="5"
                required
                disabled={true}
                />
            </fieldset>
            
            <div className="project__submit">
                <button type="submit"
                disabled={isLoading}
                >Create</button>
            </div>

        </form>
    )
}