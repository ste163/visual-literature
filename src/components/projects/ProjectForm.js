import React, { useContext, useState, useEffect} from "react"
import { ProjectContext } from "./ProjectProvider"
import { TypeContext } from "../type/TypeProvider"
import "./ProjectForm.css"

export const ProjectForm = props => {

    const editableProject = props.props
    const userId = +sessionStorage.getItem("userId")

    // Populates date picker with current date.
    const currentDate = new Date()
    const convertedDate = currentDate.toISOString().slice(0,10)

    // Set the default project so the form can reset.
    const defaultProject = {
        name: "",
        typeId: "",
        dateStarted: convertedDate,
        wordCountGoal: "",
        goalFrequency: "",
        daysPerFrequency: ""
    } 

    const { addProject, updateProject } = useContext(ProjectContext)
    const { types } = useContext(TypeContext)
    
    // Sets state for creating the project
    const [ project, setProject ] = useState(defaultProject)

    const [ selectedFreq, setSelectedFreq ] = useState("")
    const [ isFreqActive, setIsFreqActive ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
            if (editableProject) {
                setProject(editableProject)
                setIsLoading(false);
            } else {
                setIsLoading(false)
            }
    }, [])

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
            console.log("NO TYPE SELECTED -- ADD WARNING MODAL")
        } else {
            // Prepare not entered inputs for saving
            if (project.goalFrequency === "daily") {
                project.daysPerFrequency = 1
            }
            if (!project.dateStarted) {
                project.dateStarted = convertedDate
            }
            
            if (editableProject) {
                updateProject({
                    id: editableProject.id,
                    name: project.name,
                    userId,
                    typeId: +project.typeId,
                    dateStarted: project.dateStarted,
                    wordCountGoal: +project.wordCountGoal,
                    goalFrequency: project.goalFrequency,
                    daysPerFrequency: +project.daysPerFrequency,
                    completed: false
                })

            } else {
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
                setProject(defaultProject)
            }  
        }
    }

    const createProject = (e) => {
        e.preventDefault()
        constructNewProject()
        setIsFreqActive(false)
    }

    return (
        <form className="form__project" onSubmit={createProject}>

            <h3 className="form__h3">
                {editableProject ? "Update Project ": "Create New Project"}
            </h3>
            
            <h4 className="form__h4">Project Setup</h4>

            <fieldset>
                <label htmlFor="projectName">Project name: </label>
                <input type="text"
                onChange={handleControlledInputChange}
                id="projectName"
                name="name"
                value={project.name}
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
                value={project.typeId}
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
                value={project.dateStarted}
                />
            </fieldset>

            <h4 className="form__h4">Goal Setup</h4>

            <fieldset>
                <label htmlFor="projectGoal">Word count goal: </label>
                <input type="number"
                 onChange={handleControlledInputChange}
                 id="projectGoal"
                 name="wordCountGoal"
                 value={project.wordCountGoal}
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
                    checked={project.goalFrequency === "daily"}
                    onChange={handleControlledInputChange}
                    onClick={e => {
                        setIsFreqActive(false)
                        setSelectedFreq(e.target.value)
                    }}
                    />
                    <label htmlFor="daily">Daily</label>
                    
                    <input className="input__radio" type="radio" id="weekly" name="goalFrequency" value="weekly" required
                    checked={project.goalFrequency === "weekly"}
                    onChange={handleControlledInputChange}
                    onClick={e => {
                        setIsFreqActive(true)
                        setSelectedFreq(e.target.value)
                    }}
                    />
                    <label htmlFor="weekly">Weekly</label>

                    <input className="input__radio" type="radio" id="monthly" name="goalFrequency" value="monthly" required
                    checked={project.goalFrequency === "monthly"}
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
                    How many days per <span className={isFreqActive ? "freq__selected" : "label__days"} >{isFreqActive ? freqGenerator() : ""}</span> do you plan on writing:
                </label>

                <input type="number"
                className={isFreqActive ? "day__placeholder--active" : "day__placeholder--inactive"}
                onChange={handleControlledInputChange}
                id="daysPerFrequency"
                name="daysPerFrequency"
                value={project.daysPerFrequency}
                placeholder="3"
                disabled={!isFreqActive}
                required
                />
            </fieldset>
            
            <div className="project__submit">
                <button 
                className="btn btn--green"
                type="submit"
                disabled={isLoading}>
                    {editableProject ? "Update" : "Create"}
                </button>
            </div>

        </form>
    )
}