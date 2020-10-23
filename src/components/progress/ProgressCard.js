import React, { useContext, useEffect, useRef } from "react"
import { ProgressContext } from "./ProgressProvider"
import { Modal } from "../modal/Modal"
import { ProgressForm } from "./ProgressForm"
import "./ProgressCard.css"

// To populate progress, will need ProgressProvider

export const ProgressCard = (project) => {

    const { progress } = useContext(ProgressContext)
    
    const progressModal = useRef()

    // When user changes progress, update.
    // DO NOT getProgress again, just use the current
    // state of the progress. The get happens in the form
    // after the submit occurs

    // console.log(progress)

    console.log("Project FREQ", project.project.goalFrequency)

    const wordCountGoal = project.project.wordCountGoal
    const goalFrequency = project.project.goalFrequency
    const daysPerFrequency = project.project.daysPerFrequency

    return (
    <section className="card card__color--orange card__progress">
        
        <div className="progress__content">
            <h3 className="progress_h3">Goal</h3>
            <p className="progress_p">{wordCountGoal} words {goalFrequency === "daily" ? goalFrequency : `${daysPerFrequency} days a ${goalFrequency}` }</p>
            <h3 className="progress_h3">Progress</h3>
            <p className="progress_p">PROGRESS BAR</p>
            <p className="progress_p">XX / XX words written</p>
            <p className="progress_p">XX days left OR none if daily</p>
        </div>

        <button className="btn btn--purple"
        onClick={e => progressModal.current.className = "background__modal modal__active"}>Add Progress</button>
        
        <Modal ref={progressModal} key={project.id} contentFunction={<ProgressForm project={project}/>} width="modal__width--wide" />

    </section>
    )
}