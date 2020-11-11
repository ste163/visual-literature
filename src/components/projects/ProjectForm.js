import React, { useContext, useState, useEffect, useRef } from "react"
import { ProjectContext } from "./ProjectProvider"
import { ProgressContext } from "../progress/ProgressProvider"
import { TypeContext } from "../type/TypeProvider"
import { Modal } from "../modal/Modal"
import "./ProjectForm.css"

export const ProjectForm = props => {

    const editableProject = props.props
    const userId = +sessionStorage.getItem("userId")

    const typeModal = useRef()
    const wordGoalModal = useRef()

    const datePicker = useRef()
    // Get todays date and fix issues based on timezones
    const basicDate = new Date()
    const todaysDate = new Date(basicDate.getTime() - (basicDate.getTimezoneOffset() * 60000)).toISOString().split("T")[0]

    if (datePicker.current !== undefined) {
        datePicker.current.max = todaysDate
    }

    // Set the default project so the form can reset.
    const defaultProject = {
        name: "",
        typeId: "",
        dateStarted: "",
        wordCountGoal: "",
        goalFrequency: "",
        daysPerFrequency: ""
    } 

    const { projects, addProject, updateProject } = useContext(ProjectContext)
    const { getProgressByProjectId } = useContext(ProgressContext)
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
    }, [projects])

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

    const constructNewProject = (e) => {
        if (!parseInt(project.typeId)) {
            typeModal.current.className = "background__modal modal__active"
        } else {
            // Prepare not entered inputs for saving
            if (project.goalFrequency === "daily") {
                project.daysPerFrequency = 1
            }

            if (+project.wordCountGoal === 0) {
                wordGoalModal.current.className = "background__modal modal__active"
            } else {
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
                    }).then(() => {
                        getProgressByProjectId(editableProject.id)
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
                e.currentTarget.parentNode.parentNode.parentNode.className = "background__modal"
            }   
        }
    }

    const createProject = (e) => {
        e.preventDefault()
        constructNewProject(e)
        setIsFreqActive(false)
    }

    const TypeWarning = () => (
        <>
            <h2 className="modal__warning">Warning</h2>
            <p className="warning__p">No project type selected.</p>
            <button className="btn btn--red"
            onClick={e => typeModal.current.className = "background__modal"}>
                Close
            </button>
        </>
    )

    const WordGoal = () => (
        <>
            <h2 className="modal__warning">Warning</h2>
            <p className="warning__p">Word count goal cannot be zero.</p>
            <button className="btn btn--red"
            onClick={e => wordGoalModal.current.className = "background__modal"}>
                Close
            </button>
        </>
    )

    return (
        <>
        <Modal ref={typeModal} contentFunction={<TypeWarning/>} width={"modal__width--small"}/>
        <Modal ref={wordGoalModal} contentFunction={<WordGoal/>} width={"modal__width--small"}/>

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
                <input
                ref={datePicker}
                required 
                type="date"
                onChange={handleControlledInputChange}
                id="projectDate"
                name="dateStarted"
                value={project.dateStarted}
                />
            </fieldset>

            <h4 className="form__h4 form__h4--goal">Goal Setup</h4>

            <fieldset>
                <label htmlFor="projectGoal">Word count goal per day: </label>
                <input type="number"
                 onChange={handleControlledInputChange}
                 id="projectGoal"
                 name="wordCountGoal"
                 value={project.wordCountGoal}
                 min="0"
                 placeholder="500"
                 required
                 autoFocus
                 />
            </fieldset>
            
            <fieldset className="freq__radios">
                <label>Goal frequency: </label>
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
                    How many days <span className={isFreqActive ? "freq__selected" : "label__days"} >{isFreqActive ? `per ${freqGenerator()}` : ""}</span> do you plan on writing:
                </label>

                <input type="number"
                className={isFreqActive ? "day__placeholder--active" : "day__placeholder--inactive"}
                onChange={handleControlledInputChange}
                id="daysPerFrequency"
                name="daysPerFrequency"
                value={project.daysPerFrequency}
                min="1"
                max={selectedFreq === "weekly" ? "6" : "27"}
                placeholder="3"
                disabled={!isFreqActive}
                required
                />
            </fieldset>
            
            <div className="project__submit">
                <button 
                className="btn"
                type="submit"
                disabled={isLoading}>
                    {editableProject ? "Update" : "Create"}
                </button>
            </div>

        </form>
        </>
    )
}