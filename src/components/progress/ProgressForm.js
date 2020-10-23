import React, { useContext, useState, useEffect, useRef} from "react"
import { ProgressContext } from "./ProgressProvider"
import "./ProgressForm.css"

// Storing projectId to pass into the provider for getting
// progress for current project, on current date
// IF there is progress in the database for this date,
// then you edit

// WRONG, the check needs to happen the second the progress section renders
// THAT WAY, the progress button will say edit/add based on the current date
// It can say Edit Today's Progress
// Or Add Today's Progress
// But that might be too restrictive sounding, so we'll have to see

// OR SAY GOAL COMPLETED FOR TODAY when you click show more.

// IF you've already added progress for today, could pop up modal saying,
// You've entered progress for today. Would you like to edit progress?


export const ProgressForm = project => {
    
    const dateInput = useRef();

    // Populates date picker with current date.
    const currentDate = new Date()
    const convertedDate = currentDate.toISOString().slice(0,10)

    // Get the current project being passed in.
    const passedInProject = project.project.project
    // console.log(passedInProject)
    const projectId = passedInProject.id

    // Set default progress so form can reset when needed.
    const defaultProgress = {
        id: 1,
        projectId: projectId,
        dateEntered: convertedDate,
        wordsWritten: 0,
        revised: false,
        edited: false,
        proofread: false
    }

    const { progress, getProgressByProject, addProgress } = useContext(ProgressContext)

    const [ currentProgress, setCurrentProgress ] = useState(defaultProgress)
    const [ dateState, setDateState ] = useState()
    const [ isLoading, setIsLoading ] = useState(true)

    // If any progress changes, re-render the progress form
    useEffect(() => {
        // CHECK for if there is any PROGRESS on this PROJECT'S
        // current date ? show edit : show add
        // setIsLoading(false)
        const foundProgress = progress.filter(progress => {
            setDateState(dateInput.current.value)
            return progress.dateEntered === dateState
        })
        
        if (foundProgress.length !== 0) {
            console.log("FOUND", foundProgress)
        } else {
            console.log("NOT FOUND")
        }

    }, [progress, dateState])

    // console.log("PROGRESS", progress)
    // console.log("CURRENT PROGRESS", currentProgress)

    const constructNewProgress = () => {
        console.log("SUBMITTED PROGRESS")
        // CHECK FOR IF GOAL COMPLETED FOR TODAY
    }

    const handleControlledInputChange = e => {
        setDateState(dateInput.current.value)
        const newProgress = { ...currentProgress }
        newProgress[e.target.name] = e.target.value
        setCurrentProgress(newProgress)
}

    const createProgress = (e) => {
        e.preventDefault()
        constructNewProgress()
    }

    return (
        <form className="form__progress" onSubmit={createProgress}>

            <h3 className="form__h3">Add Progress to</h3>

            <h4 className="form__h4"><em>{passedInProject.name}</em></h4>
            
            <fieldset>
                <label htmlFor="progressDate">Progress date:</label>
                <input  ref={dateInput} type="date"
                onChange={handleControlledInputChange}
                id="progressDate"
                name="dateEntered"
                value={currentProgress.dateEntered}
                />
            </fieldset>

            <fieldset>
                <label htmlFor="progressGoal">Words written: </label>
                <input type="number"
                 onChange={handleControlledInputChange}
                 id="progressGoal"
                 name="wordsWritten"
                 value={currentProgress.wordCountGoal}
                 required
                 autoFocus
                 />
            </fieldset>

            <fieldset>
                <label>Writing Processes Completed</label>

                <input type="checkbox" id="revised" name="revised" value="revised"
                defaultChecked={currentProgress.revised}
                onChange={handleControlledInputChange}
                />
                <label htmlFor="revised">Revised</label>

                <input type="checkbox" id="edited" name="edited" value="edited"
                defaultChecked={currentProgress.edited}
                onChange={handleControlledInputChange}/>
                <label htmlFor="edited">Edited</label>

                <input type="checkbox" id="proofread" name="proofread" value="proofread"
                defaultChecked={currentProgress.proofread}
                onChange={handleControlledInputChange}/>
                <label htmlFor="proofread">Proofread</label>

            </fieldset>

            <div className="progress__submit">
                <button 
                className="btn btn--green"
                type="submit"
                disabled={isLoading}>
                    Add
                </button>
            </div>

        </form>
    )

}