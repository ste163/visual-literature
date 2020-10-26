import React, { useContext, useRef, useEffect } from "react"
import { ProgressContext } from "./ProgressProvider"
import { Modal } from "../modal/Modal"
import { ProgressForm } from "./ProgressForm"
import Chart from 'chart.js'
import "./ProgressCard.css"

export const ProgressCard = (project) => {

    const { progress, getProgressByProjectId } = useContext(ProgressContext)

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

    useEffect(() => {
        new Chart(progressBar.current, {
          type: "horizontalBar",
          data: {
            labels: ["Progress"],
            datasets: [{
                label: "Progress",
                data: [0.5],
                backgroundColor:"#171717ff",
                borderWidth: 0,
            },
            {
                label: "Goal",
                data: [1],
                backgroundColor: "#FCFCFC",
                borderWidth: 0,
            },
            ],
          },
          options: {
            scales: {
                xAxes: [{
                    stacked: true,
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        min: 0,
                        max: 1,
                        padding: 0,
                        display: true
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
                        max: 1,
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
        });
      }, []);

    switch(goalFrequency) {
        case "daily":
            const todaysProgress = progress.filter(each => each.dateEntered === todaysDate)
            if (todaysProgress.length !== 0) {
                if (todaysProgress[0].dateEntered === todaysDate) {
                    if (todaysProgress[0].completed === true) {
                        console.log("PROGRESS COMPLETED FOR TODAY")
                    } else {
                        console.log("PROGRESS MADE, BUT NOT COMPLETED FOR TODAY")
                    }
                }
            } else {
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
            <canvas ref={progressBar} id="progress__bar" width="50" height="50" />
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