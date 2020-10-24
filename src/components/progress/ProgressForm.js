import React, { useContext, useState, useEffect } from "react"
import { ProgressContext } from "./ProgressProvider"
import "./ProgressForm.css"

export const ProgressForm = project => {

    // Populates date picker with current date.
    const currentDate = new Date()
    const todaysDate = currentDate.toISOString().slice(0,10)

    // Get the current project being passed in.
    const passedInProject = project.project.project
    // console.log(passedInProject)
    const projectId = passedInProject.id

    // Set default progress so form can reset when needed.
    const defaultProgress = {
        projectId: projectId,
        dateEntered: "",
        wordsWritten: "",
        revised: false,
        edited: false,
        proofread: false
    }

    const { progress, addProgress } = useContext(ProgressContext)

    const [ currentProgress, setCurrentProgress ] = useState(defaultProgress)
    const [ progressFound, setProgressFound ] = useState(false)
    const [ isLoading, setIsLoading ] = useState(true)


    const constructNewProgress = () => {
        console.log("SUBMITTED", currentProgress)
        // CHECK FOR IF GOAL COMPLETED FOR TODAY
    }

    const filterCurrentDate = (dateValue) => {
        // Loop through all progress, find matching projectId to one being passed in
        const passedInProjectProgress = progress.filter(progress =>  progress.projectId === projectId)
        // Check if the entered date is in the passed in progress
        const foundProgress = passedInProjectProgress.filter(progress => {
            return progress.dateEntered === dateValue
        })

        if (foundProgress.length !== 0) {
            setCurrentProgress(foundProgress[0])
            console.log("CURRENT SET TO", currentProgress)
            setProgressFound(true);
            setIsLoading(false)
        } else {
            console.log("NOT FOUND")
            setCurrentProgress(defaultProgress)
            setProgressFound(false);
            setIsLoading(false)
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
        } else {
            newProgress[e.target.name] = e.target.value
        }

        // setCurrentProgress(newProgress)
        console.log("NEW PROGRESS SET", newProgress)
}

    const createProgress = (e) => {
        e.preventDefault()
        constructNewProgress()
    }

    // Template for what's in state
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
                defaultChecked={currentProgress.revised === false ? false : true}
                onChange={handleControlledInputChange}
                />
                <label htmlFor="revised">Revised</label>

                <input type="checkbox" id="edited" name="edited" value="edited"
                defaultChecked={currentProgress.edited === false ? false : true}
                onChange={handleControlledInputChange}/>
                <label htmlFor="edited">Edited</label>

                <input type="checkbox" id="proofread" name="proofread" value="proofread"
                defaultChecked={currentProgress.proofread === false ? false : true}
                onChange={handleControlledInputChange}/>
                <label htmlFor="proofread">Proofread</label>

            </fieldset>

            <div className="progress__submit">
                <button 
                className="btn btn--green"
                type="submit"
                disabled={isLoading}>
                    {progressFound ? "Update" : "Add"}
                </button>
            </div>

        </form>
    )

}