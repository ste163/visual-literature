import React, { useContext, useRef, useEffect, useState } from "react"
import { ProgressContext } from "./ProgressProvider"
import { ProgressForm } from "./ProgressForm"
import { Modal } from "../modal/Modal"
import Chart from 'chart.js'
import { isSameWeek } from 'date-fns'
import "./ProgressCard.css"

export const ProgressCard = (project) => {

    const { progress, getProgressByProjectId, getProgressByUserId } = useContext(ProgressContext)
    const [ goalProgression, setGoalProgression ] = useState()
    // goalFreqComplete can be: 0, 1, or 2 (0 is no progress, 1 is some progress, 2 is complete for freq)
    const [ goalFreqComplete, setGoalFreqComplete ] = useState()

    const progressModal = useRef()
    const progressBar = useRef()

    const currentDate = new Date()
    const todaysDate = currentDate.toISOString().slice(0,10)

    const wordCountGoal = project.project.wordCountGoal
    const goalFrequency = project.project.goalFrequency
    const daysPerFrequency = project.project.daysPerFrequency

    const checkGoalProgress = () => {
        switch(goalFrequency) {
            case "daily":
                // Get only the progress that matches today
                const todaysProgress = progress.filter(each => each.dateEntered === todaysDate)
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
                // To ensure that the date entered IS actually correct, at least with console.logs, have to replace the - with /
                // console.log(new Date("2020-10-27".replace(/-/g, '\/')))
                console.log(isSameWeek(new Date("2020/10/31"), currentDate))
                break;
                
            case "monthly":
                // Create a counter for amount completed
                let monthlyProgressCounter = 1
                // Get only the progress that matches today's date
                const monthlyProjects = progress.filter(each => each.project.goalFrequency === "monthly")
                const currentMonth = new Date(todaysDate).getMonth()
                // Match only progress that matches today's date
                const thisMonthsProgress = monthlyProjects.filter(each => {
                    const progressMonth = new Date(each.dateEntered).getMonth()
                    return progressMonth === currentMonth
                })
                if (thisMonthsProgress.length !== 0) {
                    // For each progress of this month, run the goal checks
                    thisMonthsProgress.forEach(progress => {
                        if (progress.wordsWritten >= wordCountGoal) {
                            // If we have progress, increase the counter, then setGoalProgression as the counter
                            monthlyProgressCounter = ++monthlyProgressCounter
                            setGoalProgression(monthlyProgressCounter)
                        }
                        if (progress.proofread || progress.revised || progress.edited) {
                            monthlyProgressCounter = ++monthlyProgressCounter
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

    // Pass different data and max's in
    const horizontalBarChart = {
        type: "horizontalBar",
        data: {
          labels: ["Progress"],
          datasets: [{
              label: "Progress",
              data: [goalProgression],
              backgroundColor:"#171717ff",
              borderWidth: 0,
          },
          {
              label: "Goal",
              data: [daysPerFrequency],
              backgroundColor: "#FCFCFC",
              borderWidth: 0,
          },
          ],
        },

        options: {

        responsive: true,
        maintainAspectRation: false,

          tooltips: {
              enabled: false,
          },

          animation: {
              duration: 800
          },

          events:[],

          scales: {
              xAxes: [{
                  stacked: true,
                  gridLines: {
                      display: false
                  },
                  ticks: {
                      min: 0,
                      max: daysPerFrequency,
                      display: false
                  },
                  scaleLabel: {
                      display: false
                  }
              }],

              yAxes: [{
                  stacked: true,
                  gridLines: {
                      display: false
                  },
                  ticks: {
                      min: 0,
                      display: false
                  } 
              }, { 
                  stacked: true,
                  display: false,
              }],
          },
          
          legend: {
              display: false
          }
        }
      }

      useEffect(() => {
        new Chart(progressBar.current, horizontalBarChart);
        checkGoalProgress()
      }, [checkGoalProgress]);

    return (
    <section className="card card__color--mintBlue card__progress">
        
        <div className="progress__content">
            <h3 className="progress_h3">Goal</h3>
            <p className="progress_p">{wordCountGoal} words
                {goalFrequency === "daily" ? ` ${goalFrequency}` : 
                    `${goalFrequency === "weekly" ? ` ${daysPerFrequency} days per week` : ` ${daysPerFrequency} days per month`}`
                }
            </p>

            <h3 className="progress_h3">Progress</h3>

            <div>
                <canvas ref={progressBar} id="progress__bar" width="50" height="50" />
            </div>

            <p className="progress_p">{goalFreqComplete === 2 ? "Progress complete for this frequency" :
            "X AMOUNT OF PROGRESS LEFT"}</p>
            <p className="progress_p">XX / XX words written</p>
            <p className="progress_p">XX days left OR none if daily</p>
        </div>

        <button className="btn"
        onClick={e => {
            progressModal.current.className = "background__modal modal__active"
            getProgressByProjectId(project.project.id)
            }}>
            Add Progress</button>
        
        <Modal ref={progressModal} key={project.project.id} userId={project.project.userId} fetchFunction={getProgressByUserId} contentFunction={<ProgressForm project={project}/>} width="modal__width--wide" />

    </section>
    )
}