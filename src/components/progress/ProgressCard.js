import React, { useContext, useRef, useEffect, useState } from "react"
import { ProgressContext } from "./ProgressProvider"
import { ProgressForm } from "./ProgressForm"
import { Modal } from "../modal/Modal"
import { isSameWeek } from 'date-fns'
import { horizontalBar } from "../graphs/horizontalBar"
import Chart from 'chart.js'
import "./ProgressCard.css"

export const ProgressCard = (project) => {
    console.log(project.progress)

    const progress = project.progress

    const [ goalProgression, setGoalProgression ] = useState()
    // goalFreqComplete can be: 0, 1, or 2 (0 is no progress, 1 is some progress, 2 is complete for freq)
    const [ goalFreqComplete, setGoalFreqComplete ] = useState()

    const progressModal = useRef()
    const progressBar = useRef()

    const currentDate = new Date()
    console.log("CURRENT DATE", currentDate)
    const convertedToISO = currentDate.toISOString().slice(0,10)
    console.log("CONVERTED", convertedToISO)
    const removeTimeFromDate = new Date(`${convertedToISO} 00:00:00`)
    console.log(removeTimeFromDate)
    const todaysDate = removeTimeFromDate.toISOString().slice(0,10)

    const wordCountGoal = project.project.wordCountGoal
    const goalFrequency = project.project.goalFrequency
    const daysPerFrequency = project.project.daysPerFrequency

    const checkGoalProgress = () => {
        switch(goalFrequency) {
            case "daily":
                // Get only progress for projects that are daily
                const dailyProjects = progress.filter(each => each.project.goalFrequency === "daily")
                // Get only the progress that matches today
                const todaysProgress = dailyProjects.filter(each => {
                    console.log("ENTERED DATE", each.dateEntered)
                    console.log("TODAY?",todaysDate)
                    return each.dateEntered === todaysDate
                
                })
                if (todaysProgress.length !== 0) {
                    // If the progress we have matches today's date, run the block
                    if (todaysProgress[0].dateEntered === todaysDate) {
                        // If more words written than the goal, set complete, if some progress made, set halfway
                        if (todaysProgress[0].wordsWritten >= wordCountGoal) {
                            setGoalProgression(1)
                            setGoalFreqComplete(2)
                        } else {
                            setGoalProgression(0.5)
                            setGoalFreqComplete(1)
                        }
                        if (todaysProgress[0].proofread || todaysProgress[0].revised || todaysProgress[0].edited) {
                            setGoalProgression(1)
                            setGoalFreqComplete(2)
                        }
                    }
                    // If no progress on today's date, set as 0
                } else {
                    setGoalFreqComplete(0)
                    setGoalProgression(0)
                }
                break;

            case "weekly":
                let weeklyProgressCounter = 0
                const weeklyProjects = progress.filter(each => each.project.goalFrequency === "weekly")
                const thisWeeksProgress = weeklyProjects.filter(each => {
                    const progressDate = new Date(`${each.dateEntered} 00:00:00`)
                    return isSameWeek(progressDate, currentDate)
                })
                if (thisWeeksProgress.length !== 0) {
                    thisWeeksProgress.forEach(progress => {
                        if (progress.wordsWritten >= wordCountGoal) {
                            ++weeklyProgressCounter
                            setGoalProgression(weeklyProgressCounter)
                        }
                        if (progress.wordsWritten < wordCountGoal && progress.proofread || progress.revised || progress.edited) {
                            ++weeklyProgressCounter
                            setGoalProgression(weeklyProgressCounter)
                        } else {
                            setGoalProgression(0)
                        }
                    })
                    if (weeklyProgressCounter >= daysPerFrequency) {
                        setGoalFreqComplete(2)
                    }  else if (weeklyProgressCounter < daysPerFrequency) {
                        setGoalFreqComplete(1)
                    }
                } else {
                    setGoalFreqComplete(0)
                    setGoalProgression(0)
                }
                break;
                
            case "monthly":
                let monthlyProgressCounter = 0

                const monthlyProjects = progress.filter(each => each.project.goalFrequency === "monthly")
                const currentMonth = new Date(`${todaysDate} 00:00:00`).getMonth()

                const thisMonthsProgress = monthlyProjects.filter(each => {
                    const progressMonth = new Date(`${each.dateEntered} 00:00:00`).getMonth()
                    return progressMonth === currentMonth
                })
                if (thisMonthsProgress.length !== 0) {
                    // For each progress of this month, run the goal checks
                    thisMonthsProgress.forEach(progress => {
                        if (progress.wordsWritten >= wordCountGoal) {
                            // If we have progress, increase the counter, then setGoalProgression as the counter
                            ++monthlyProgressCounter
                            setGoalProgression(monthlyProgressCounter)
                        }
                        if (progress.wordsWritten < wordCountGoal && progress.proofread || progress.revised || progress.edited) {
                            ++monthlyProgressCounter
                            setGoalProgression(monthlyProgressCounter)
                        }
                    })
                    // If the counter reaches the freq for the month, set complete
                    if (monthlyProgressCounter >= daysPerFrequency) {
                        setGoalFreqComplete(2)
                    }  else if (monthlyProgressCounter < daysPerFrequency) {
                        setGoalFreqComplete(1)
                    }
                } else {
                    setGoalFreqComplete(0)
                    setGoalProgression(0)
                }
                break;
        }
    }

      useEffect(() => {
        checkGoalProgress()
        new Chart(progressBar.current, horizontalBar(goalProgression, daysPerFrequency));
      }, [progress]);

    return (
    <section className="card card__color--mintBlue card__progress">
        
        <div className="progress__content">
            <h3 className="progress__h3">Progress</h3>

            <div>
                <canvas ref={progressBar} id="progress__bar" width="40" height="40" />
            </div>

            <div className="progress__text">
                {
                goalFreqComplete === 0 ? <p className="progress__p">No progress for {
                    goalFrequency === "daily" ? `today` : 
                    `${goalFrequency === "weekly" ? `this week` :
                        `this month`}`}
                        .</p> : 
                    goalFreqComplete === 1 ?
                        <p className="progress__p">Goal met {goalProgression} / {daysPerFrequency} times {
                   goalFrequency === "weekly" ? "this week" : 
                        goalFrequency === "monthly" ? "this month" : "today"}
                        .</p> :
                    <p className="progress__p">Progress complete</p>
                }
            </div>
        </div>

        <button className="btn"
        onClick={e => {
            progressModal.current.className = "background__modal modal__active"
            }}>
            Add/Edit Progress
        </button>
        
        <Modal ref={progressModal} key={project.project.id} contentFunction={<ProgressForm project={project}/>} width="modal__width--med" />

    </section>
    )
}