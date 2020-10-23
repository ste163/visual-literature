import React, { useContext, useEffect, useRef } from "react"
import { ProgressContext } from "./ProgressProvider"
import { Modal } from "../modal/Modal"
import { ProgressForm } from "./ProgressForm"
import "./ProgressCard.css"

// To populate progress, will need ProgressProvider

export const ProgressCard = (project) => {

    const { progress, getProgressByProject } = useContext(ProgressContext)

    console.log("CURRENT PROGRESS", progress)
    
    const progressModal = useRef()

    const wordCountGoal = project.project.wordCountGoal
    const goalFrequency = project.project.goalFrequency
    const daysPerFrequency = project.project.daysPerFrequency

    return (
    <section className="card card__color--orange card__progress">
        
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

        <button className="btn btn--purple"
        onClick={e => {
            progressModal.current.className = "background__modal modal__active"
            getProgressByProject(project.project.id)
            }}>
            Add Progress</button>
        
        <Modal ref={progressModal} key={project.id} contentFunction={<ProgressForm project={project}/>} width="modal__width--wide" />

    </section>
    )
}