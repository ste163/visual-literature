import React, { useContext, useEffect, useRef } from "react"
import { ProgressContext } from "./ProgressProvider"
import { Modal } from "../modal/Modal"
import { ProgressForm } from "./ProgressForm"
import "./ProgressCard.css"

export const ProgressCard = (project) => {

    const { progress, getProgressByProjectId } = useContext(ProgressContext)

    console.log(project.project.name, progress)
// To handle the checking of progress, we're going to need to
// do comparisons based on:
    // What's their goal freq: daily, weekly, monthly
    // How much per freq needs to happen
        // THEN
    // find the progress that matches those freqs
    // find how many of those are called as "completed"
    // then use number of completed for that freq to populate the charts

    
    const progressModal = useRef()

    const wordCountGoal = project.project.wordCountGoal
    const goalFrequency = project.project.goalFrequency
    const daysPerFrequency = project.project.daysPerFrequency

    return (
    <section className="card card__color--mintBlue card__progress--inactive">
        
        <div className="progress__content">
            <h3 className="progress_h3">Goal</h3>
            <p className="progress_p">{wordCountGoal} words
                {goalFrequency === "daily" ? ` ${goalFrequency}` : 
                    `${goalFrequency === "weekly" ? ` ${daysPerFrequency} days per week` : ` ${daysPerFrequency} days per month`}`
                }
            </p>

            <h3 className="progress_h3">Progress</h3>
            <p className="progress_p">PROGRESS BAR</p>
            <p className="progress_p">XX / XX words written</p>
            <p className="progress_p">XX days left OR none if daily</p>
        </div>

        <button className="btn"
        onClick={e => {
            progressModal.current.className = "background__modal modal__active"
            getProgressByProjectId(project.project.id)
            }}>
            Add Progress</button>
        
        <Modal ref={progressModal} key={project.id} contentFunction={<ProgressForm project={project}/>} width="modal__width--wide" />

    </section>
    )
}