import React, { useContext, useState, useRef } from "react"
import { ProgressContext } from "./ProgressProvider"
import { Modal } from "../modal/Modal"
import "./ProgressForm.css"

export const ProgressForm = project => {

    // Get the current project being passed in.
    let passedInProject

    // Store the value of whatever project we're passing in
    // based on where it's being based in from
    if (project.project.project === undefined) {
        passedInProject = project.project
    } else {
        passedInProject = project.project.project
    }
    
    const projectId = passedInProject.id

    // Get todays date and fix issues based on timezones
    const basicDate = new Date()
    const todaysDate = new Date(basicDate.getTime() - (basicDate.getTimezoneOffset() * 60000)).toISOString().split("T")[0]

    const datePicker = useRef()
    const deleteModal = useRef()
    const wordsModal = useRef()
  
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

    const { progress, addProgress, updateProgress, deleteProgress } = useContext(ProgressContext)
    const [ currentProgress, setCurrentProgress ] = useState(defaultProgress)
    const [ progressFound, setProgressFound ] = useState(false)
    const [ datePicked, setDatePicked ] = useState(false)

    // Set date picker's max to today
    if (datePicker.current !== undefined) {
        datePicker.current.max = todaysDate
        datePicker.current.min = passedInProject.dateStarted 
    }

    const constructNewProgress = (e) => {
        // Add today's date if selected
        if (currentProgress.dateEntered === "") {
            currentProgress.dateEntered = todaysDate
        }

        if (currentProgress.wordsWritten === 0) {
            wordsModal.current.className = "background__modal modal__active"
        } else {
            if (progressFound) {
                updateProgress({
                    id: currentProgress.id,
                    projectId,
                    userId,
                    dateEntered: currentProgress.dateEntered,
                    wordsWritten: currentProgress.wordsWritten,
                    revised: currentProgress.revised,
                    edited: currentProgress.edited,
                    proofread: currentProgress.proofread,
                })
    
            } else {
                addProgress({
                    projectId,
                    userId,
                    dateEntered: currentProgress.dateEntered,
                    wordsWritten: currentProgress.wordsWritten,
                    revised: currentProgress.revised,
                    edited: currentProgress.edited,
                    proofread: currentProgress.proofread,
                })
            }
            setCurrentProgress(defaultProgress)
            setProgressFound(false);
            e.currentTarget.parentNode.parentNode.parentNode.className = "background__modal"
        }

    }

    const filterCurrentDate = dateValue => {
        // Check if the entered date is in the passed in progress
        const foundProgress = progress.filter(progress => progress.dateEntered === dateValue)

        if (foundProgress.length !== 0) {
            delete foundProgress[0].project
            const foundObject = foundProgress[0]
            setCurrentProgress(currentProgress.id = foundObject.id)
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
        setDatePicked(false)
        e.preventDefault()
        constructNewProgress(e)
    }

    // Modal warning content 
    const DeleteWarning = () => (
        <>
        <h2 className="modal__warning">Warning</h2>
        <p className="warning__p">Deleting progress is permanent.</p>
        <button className="btn btn--red"
        onClick={e => {
            deleteProgress(currentProgress.projectId, currentProgress.id)
            deleteModal.current.className = "background__modal"
            deleteModal.current.parentNode.parentNode.parentNode.className = "background__modal"
            setCurrentProgress(defaultProgress)
            setProgressFound(false);
            }
        }>
            Confirm
        </button>
        </>
    )

    // Modal warning content 
    const ZeroWordsWritten = () => (
        <>
        <h2 className="modal__warning">Warning</h2>
        <p className="warning__p">Zero words entered.</p>
        <button className="btn btn--red"
        onClick={e => wordsModal.current.className = "background__modal"}>
            Close
        </button>
        </>
    )

    // Template for what's in state that we pass in
    return (
        <>
        <Modal ref={deleteModal} contentFunction={<DeleteWarning/>} width={"modal__width--small"}/>
        <Modal ref={wordsModal} contentFunction={<ZeroWordsWritten/>} width={"modal__width--small"}/>

        <form className="form__progress" onSubmit={createProgress}>

            <h3 className="form__h3 form__h3--progress">{progressFound ? "Update Progress for" : "Add Progress to"}</h3>

            <h4 className="form__h4 form__h4--progress"><em>{passedInProject.name}</em></h4>
            
            <fieldset>
                <label htmlFor="progressDate">Progress date:</label>
                <input
                ref={datePicker}
                type="date"
                onChange={e => {
                    setDatePicked(true)
                    filterCurrentDate(e.target.value)
                    handleControlledInputChange(e)
                    }
                }
                id="progressDate"
                name="dateEntered"
                value={currentProgress.dateEntered}
                required/>
            </fieldset>

            <fieldset>
                <label htmlFor="progressGoal"
                className={!datePicked ? "label__progress--inactive" : "label__progress--active"}>
                    Words written:
                </label>
                <input type="number"
                className={!datePicked ? "label__words--inactive" : "input__words--active"}
                onChange={handleControlledInputChange}
                id="progressGoal"
                name="wordsWritten"
                value={currentProgress.wordsWritten}
                min="0"
                placeholder={passedInProject.wordCountGoal}
                required
                disabled={!datePicked}
                autoFocus/>
            </fieldset>

            <fieldset>
                <label
                className={!datePicked ? "label__progress--inactive" : "label__progress--active"}>
                    Writing Processes Completed
                </label>
                <div className="form__checkContainer">                
                    <input className="progress__checkbox--first"
                    type="checkbox" id="revised" name="revised" value="revised"
                    checked={currentProgress.revised}
                    onChange={handleControlledInputChange}
                    disabled={!datePicked}/>
                    <label className={!datePicked ? "label__progress--inactive" : "label__progress--active"} htmlFor="revised">Revised</label>

                    <input className="progress__checkbox"
                    type="checkbox" id="edited" name="edited" value="edited"
                    checked={currentProgress.edited}
                    onChange={handleControlledInputChange}
                    disabled={!datePicked}/>
                    <label className={!datePicked ? "label__progress--inactive" : "label__progress--active"} htmlFor="edited">Edited</label>

                    <input className="progress__checkbox"
                    type="checkbox" id="proofread" name="proofread" value="proofread"
                    checked={currentProgress.proofread}
                    onChange={handleControlledInputChange}
                    disabled={!datePicked}/>
                    <label className={!datePicked ? "label__progress--inactive" : "label__progress--active"} htmlFor="proofread">Proofread</label>
                </div>
            </fieldset>

            <div className="progress__submit">
                <button 
                className="btn"
                type="submit">
                    {progressFound ? "Update" : "Add"}
                </button>
                {progressFound ? 
                    <button 
                    className="btn btn--red"
                    type="button"
                    onClick={e => deleteModal.current.className = "background__modal modal__active"}>
                        Delete
                    </button>
                    : null
                }
            </div>

        </form>
        </>
    )
}