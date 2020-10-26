import React, { useContext, useRef, useEffect, useState } from "react"
import { ProgressContext } from "./ProgressProvider"
import { Modal } from "../modal/Modal"
import { ProgressForm } from "./ProgressForm"
import Chart from 'chart.js'
import "./ProgressCard.css"

export const ProgressCard = (project) => {

    const { progress, getProgressByProjectId } = useContext(ProgressContext)
    const [ goalProgression, setGoalProgression ] = useState(0)
    // goalFreqComplete can be: 0, 1, or 2 (0 is no progress, 1 is some progress, 2 is complete for freq)
    const [ goalFreqComplete, setGoalFreqComplete ] = useState(0)

    const progressModal = useRef()
    const progressBar = useRef()

    const currentDate = new Date()
    const todaysDate = currentDate.toISOString().slice(0,10)

    const wordCountGoal = project.project.wordCountGoal
    const goalFrequency = project.project.goalFrequency
    const daysPerFrequency = project.project.daysPerFrequency

// To handle the checking of progress, we're going to need to
// do comparisons based on:
    // What's their goal freq: daily, weekly, monthly
        // FOR Weekly, convert dates from picker, starting with console.log(Date("2020-10-03"))
    // How much per freq needs to happen
        // THEN
    // find the progress that matches those freqs
    // find how many of those are called as "completed"
    // then use number of completed for that freq to populate the charts
    const checkGoalProgress = () => {
        switch(goalFrequency) {
            case "daily":
                const todaysProgress = progress.filter(each => each.dateEntered === todaysDate)
                if (todaysProgress.length !== 0) {
                    if (todaysProgress[0].dateEntered === todaysDate) {
                        if (todaysProgress[0].completed === true) {
                            console.log("PROGRESS COMPLETED FOR TODAY")
                            setGoalProgression(1)
                            // THIS LINE ONLY NEEDED FOR WEEKLY AND MONTHLY
                            if (goalProgression === daysPerFrequency) {
                                console.log("PROGRESS COMPLETE")
                                setGoalFreqComplete(2)
                            }
                        } else {
                            console.log("PROGRESS MADE, BUT NOT COMPLETED FOR TODAY")
                        }
                    }
                } else {
                    setGoalFreqComplete(0)
                    console.log("NO PROGRESS ENTERED FOR TODAY")
                }
                break;
            case "weekly":
                // console.log("weekly")
                break;
            case "monthly":
                // console.log("monthly")
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
          tooltips: {
              enabled: false,
          },

          scales: {
              xAxes: [{
                  stacked: true,
                  gridLines: {
                      display: false
                  },
                  ticks: {
                      min: 0,
                      max: daysPerFrequency,
                      padding: 0,
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
                      max: project.project.daysPerFrequency,
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
            <canvas ref={progressBar} id="progress__bar" width="50" height="9" />
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
        
        <Modal ref={progressModal} key={project.id} contentFunction={<ProgressForm project={project}/>} width="modal__width--wide" />

    </section>
    )
}