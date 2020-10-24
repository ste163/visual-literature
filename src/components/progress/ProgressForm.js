import React, { useContext, useState, useEffect } from "react"
import { ProgressContext } from "./ProgressProvider"
import "./ProgressForm.css"

export const ProgressForm = project => {

    // Populates date picker with current date.
    const currentDate = new Date()
    const todaysDate = currentDate.toISOString().slice(0,10)

    // Get the current project being passed in.
    const passedInProject = project.project.project
    const projectId = passedInProject.id
    const userId = +sessionStorage.getItem("userId")

    // Set default progress so form can reset when needed.
    const defaultProgress = {
        projectId,
        dateEntered: "",
        wordsWritten: "",
        revised: false,
        edited: false,
        proofread: false,
    }

    const { progress, addProgress } = useContext(ProgressContext)

    const [ currentProgress, setCurrentProgress ] = useState(defaultProgress)

    const [ progressFound, setProgressFound ] = useState(false)

    const constructNewProgress = () => {

        // Add today's date if selected
        if (currentProgress.dateEntered === "") {
            currentProgress.dateEntered = todaysDate
        }

        // Check for goal completion
        if (passedInProject.wordCountGoal <= currentProgress.wordsWritten) {
            console.log("GOAL MET")
        } else {
            console.log("GOAL NOT MET")
        }

        if (currentProgress.proofread) {
            console.log("PROOFREAD, GOAL MET")
        }

        if (currentProgress.revised) {
            console.log("REVISED, GOAL MET")
        }

        if (currentProgress.edited) {
            console.log("EDITED, GOAL MET")
        }


        if (progressFound) {
            console.log("UPDATE PROGRESS", currentProgress)
        } else {
            addProgress({
                projectId,
                userId,
                dateEntered: currentProgress.dateEntered,
                wordsWritten: currentProgress.wordsWritten,
                revised: currentProgress.revised,
                edited: currentProgress.edited,
                proofread: currentProgress.proofread,
                completed: currentProgress.completed
            })
            console.log("ADD NEW PROGRESS", currentProgress)
        }
    }

    const filterCurrentDate = (dateValue) => {

        // Loop through all progress, find matching projectId to one being passed in
        const passedInProjectProgress = progress.filter(progress =>  progress.projectId === projectId)
        // Check if the entered date is in the passed in progress
        const foundProgress = passedInProjectProgress.filter(progress => progress.dateEntered === dateValue)

        if (foundProgress.length !== 0) {
            delete foundProgress[0].project
            const foundObject = foundProgress[0]
            setCurrentProgress(currentProgress.wordsWritten = foundObject.wordsWritten)
            setCurrentProgress(currentProgress.revised = foundObject.revised)
            setCurrentProgress(currentProgress.edited = foundObject.edited)
            setCurrentProgress(currentProgress.proofread = foundObject.proofread)
            setProgressFound(true);
        } else {
            setCurrentProgress(currentProgress.wordsWritten = defaultProgress.wordsWritten)
            setCurrentProgress(currentProgress.revised = defaultProgress.revised)
            setCurrentProgress(currentProgress.edited = defaultProgress.edited)
            setCurrentProgress(currentProgress.proofread = defaultProgress.proofread)
            setProgressFound(false);
        }
    }

    const handleControlledInputChange = e => {
        const newProgress = { ...currentProgress }
        if (e.target.type === "checkbox") {
            if (e.target.value === "proofread" || e.target.value === "edited" || e.target.value === "revised") {
                e.target.value = e.target.checked
                // store value as a boolean
                newProgress[e.target.name] = e.target.checked
            }
        } else if (e.target.name === "wordsWritten") {
            newProgress[e.target.name] = +e.target.value
        } else {
            newProgress[e.target.name] = e.target.value
        }
        setCurrentProgress(newProgress)
}

    const createProgress = (e) => {
        e.preventDefault()
        constructNewProgress()
    }

    // Template for what's in state that we pass in
    return (
        <form className="form__progress" onSubmit={createProgress}>

            <h3 className="form__h3">Add Progress to</h3>

            <h4 className="form__h4"><em>{passedInProject.name}</em></h4>
            
            <fieldset>
                <label htmlFor="progressDate">Progress date:</label>
                <input type="date"
                onChange={e => {
                    filterCurrentDate(e.target.value)
                    handleControlledInputChange(e)
                    }
                }
                id="progressDate"
                name="dateEntered"
                value={currentProgress.dateEntered ? currentProgress.dateEntered : todaysDate}
                />
            </fieldset>

            <fieldset>
                <label htmlFor="progressGoal">Words written: </label>
                <input type="number"
                 onChange={handleControlledInputChange}
                 id="progressGoal"
                 name="wordsWritten"
                 value={currentProgress.wordsWritten}
                 required
                 autoFocus
                 />
            </fieldset>

            <fieldset>
                <label>Writing Processes Completed</label>

                <input type="checkbox" id="revised" name="revised" value="revised"
                checked={currentProgress.revised}
                onChange={handleControlledInputChange}
                />
                <label htmlFor="revised">Revised</label>

                <input type="checkbox" id="edited" name="edited" value="edited"
                checked={currentProgress.edited}
                onChange={handleControlledInputChange}/>
                <label htmlFor="edited">Edited</label>

                <input type="checkbox" id="proofread" name="proofread" value="proofread"
                checked={currentProgress.proofread}
                onChange={handleControlledInputChange}/>
                <label htmlFor="proofread">Proofread</label>

            </fieldset>

            <div className="progress__submit">
                <button 
                className="btn btn--green"
                type="submit">
                    {progressFound ? "Update" : "Add"}
                </button>
            </div>

        </form>
    )
}