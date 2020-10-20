import React, { useContext, useState, useEffect} from "react"
import { ProjectContext } from "./ProjectProvider"
import { TypeContext } from "../type/TypeProvider"
import "./ProjectForm.css"

export const ProjectForm = props => {

    const { addProject } = useContext(ProjectContext)
    const { types, getTypes } = useContext(TypeContext)
    
    // Sets state for creating the project
    const [ project, setProject ] = useState({})
    const [ selectedFreq, setSelectedFreq ] = useState("")
    const [ isFreqActive, setIsFreqActive ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(true)

    const userId = +sessionStorage.getItem("userId")
    // Populates date picker with current date
    const currentDate = new Date()
    const convertedDate = currentDate.toISOString().slice(0,10)

    // Takes the selected radio button
    // and generates correct label string.
    const freqGenerator = () => {
        if (selectedFreq === "weekly") {
            return "week"
        } else if (selectedFreq === "monthly") {
            return "month"
        }
    }

    const handleControlledInputChange = e => {
            const newProject = { ...project }
            newProject[e.target.name] = e.target.value
            setProject(newProject)
    }

    const constructNewProject = () => {
        if (!parseInt(project.typeId)) {
            console.log("NO TYPE SELECTED")
        } else {
            setIsLoading(true)
            // Prepare not entered inputs for saving
            if (project.goalFrequency === "daily") {
                project.daysPerFrequency = 1
            }
            if (!project.dateStarted) {
                project.dateStarted = convertedDate
            }
            
                // if (projectId) {
                //     // FOR EDITING A CURRENT PROJECT
                //     console.log("UPDATED CURRENT PROJECT")

                console.log("ADDING NEW PROJECT", project)
                addProject({
                    name: project.name,
                    userId,
                    typeId: +project.typeId,
                    dateStarted: project.dateStarted,
                    wordCountGoal: +project.wordCountGoal,
                    goalFrequency: project.goalFrequency,
                    daysPerFrequency: +project.daysPerFrequency,
                    completed: false
                })
                setIsLoading(false)
            }
    }

    const createProject = (e) => {
        e.preventDefault()
        constructNewProject()
        setProject({})
        console.log("PROJECT ADDED AND RESET TO", project)
    }

    useEffect(() => {
        getTypes().then(() => {
            setIsLoading(false);
        })
    }, [])

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
                defaultValue={project.name}
                placeholder="Project name"
                required
                autoFocus/>
            </fieldset>
            
            <fieldset>
                <label htmlFor="projectType">Project Type:</label>
                <select
                onChange={handleControlledInputChange}
                id="projectType"
                name="typeId"
                defaultValue={project.typeId}
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
                name="dateStarted"
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
                 defaultValue={project.wordCountGoal}
                 placeholder="500"
                 required
                 autoFocus
                 />
                 {/* Have a tooltip saying 500 words is about 1 single-spaced page */}
            </fieldset>
            
            <fieldset className="freq__radios">
                <label>Goal Frequency: </label>
                <div className="radios">
                    <input className="input__radio" type="radio" id="daily" name="goalFrequency" value="daily" required
                    onChange={handleControlledInputChange}
                    onClick={e => {
                        setIsFreqActive(false)
                        setSelectedFreq(e.target.value)
                    }}
                    />
                    <label htmlFor="daily">Daily</label>
                    <input className="input__radio" type="radio" id="weekly" name="goalFrequency" value="weekly" required
                    onChange={handleControlledInputChange}
                    onClick={e => {
                        setIsFreqActive(true)
                        setSelectedFreq(e.target.value)
                    }}
                    />
                    <label htmlFor="weekly">Weekly</label>
                    <input className="input__radio" type="radio" id="monthly" name="goalFrequency" value="monthly" required
                    onChange={handleControlledInputChange}
                    onClick={e => {
                        setIsFreqActive(true)
                        setSelectedFreq(e.target.value)
                    }}
                    />
                    <label htmlFor="monthly">Monthly</label>
                </div>
            </fieldset>
            
            <fieldset className="freq__days">
                <label
                className={isFreqActive ? "label__days days--active" : "label__days"}
                htmlFor="daysPerFrequency">
                    How many days per <span className="freq__selected">{freqGenerator()}</span> do you plan on writing:
                </label>
                <input type="number"
                className={isFreqActive ? "day__placeholder--active" : "day__placeholder--inactive"}
                onChange={handleControlledInputChange}
                id="daysPerFrequency"
                name="daysPerFrequency"
                defaultValue={project.daysPerFrequency}
                placeholder="3"
                disabled={!isFreqActive}
                required
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