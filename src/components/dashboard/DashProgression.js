import React, { useState, useEffect, useRef } from "react"
import { isSameWeek, getWeeksInMonth } from 'date-fns'
import Chart from 'chart.js'
import { horizontalBar } from "../graphs/horizontalBar"
import { wordCountLine } from "../graphs/wordCountLine"

// Will include ALL progress checks
// And display all data

export const DashProgression = (props, progress) => {

    // Get all the dates we need
    const currentMonth = new Date()
    const currentMonthInt = currentMonth.getMonth()
    const firstDayOfMonthFull =  new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    const lastDayOfMonthFull = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
    const lastDayOfMonthInt = lastDayOfMonthFull.getDate()
    const weeksInCurrentMonth = getWeeksInMonth(currentMonth)

    // PROGRESS BAR
    const [ progressBarProgression, setProgressBarProgression] = useState()
    const [ progressBarXAxis, setProgressBarXAxis ] = useState()

    // AVERAGE WORDS WRITTEN
    const [ averageWordsWritten, setAverageWordsWritten ] = useState()
    let wordsWrittenArray = []


    // WORDS WRITTEN LINE GRAPH LABELS & DATA
    const [ lineWordsWrittenArray, setLineWordsWrittenArray ] = useState([])
    const [ lineWordsLabelArray, setLineWordsLabelArray ] = useState([])

    const wordCountGoal = props.props.wordCountGoal
    const goalFrequency = props.props.goalFrequency
    const daysPerFrequency = props.props.daysPerFrequency

    const incomingProgress = props.progress

    const progressBar = useRef()
    const wordsWrittenLine = useRef()

    const currentDate = new Date()
    const todaysDate = currentDate.toISOString().slice(0,10)

    const [ goalProgression, setGoalProgression ] = useState()
    // goalFreqComplete can be: 0, 1, or 2 (0 is no progress, 1 is some progress, 2 is complete for freq)
    const [ goalFreqComplete, setGoalFreqComplete ] = useState()
    

    // Create arrays to hold data for line graph
    let progressArray = []
    let progressDateLabels = []
    let progressWordsWritten = []

    // Goal progression check from progressCard
    const checkGoalProgress = () => {
        switch(goalFrequency) {
            case "daily":
                // Counter used for progress bar
                let dailyProgressCounter = 0

                // Set progressBarXAxis to the current month
                setProgressBarXAxis(lastDayOfMonthInt)

                // Get only progress for projects that are daily
                const dailyProjects = incomingProgress.filter(each => each.project.goalFrequency === "daily")

                // Get only the progress that matches this month
                const monthsDailyProgress = dailyProjects.filter(each => {
                    const dateEntered = new Date(each.dateEntered)
                    const monthEntered = dateEntered.getMonth()
                    return monthEntered === currentMonthInt
                })

                if (monthsDailyProgress.length !== 0) {
                    monthsDailyProgress.forEach(progress => {

                        // Find the average words written
                        if (progress.wordsWritten) {
                            wordsWrittenArray.push(progress.wordsWritten)
                            progressArray.push(progress)
                        }
                        let total = 0
                        for (let i = 0; i < wordsWrittenArray.length; i++) {
                            total += wordsWrittenArray[i]
                        }
                        const wordAverage = total / wordsWrittenArray.length
                        const roundedAverage = Math.ceil(wordAverage)
                        setAverageWordsWritten(roundedAverage)

                        // If more words written than the goal, set complete, if some progress made, set halfway
                        if (progress.wordsWritten >= wordCountGoal) {
                            ++dailyProgressCounter
                            setProgressBarProgression(dailyProgressCounter)
                            setGoalFreqComplete(2)
                        } else {
                            setGoalFreqComplete(1)
                        }
                        if (progress.proofread || progress.revised || progress.edited) {
                            ++dailyProgressCounter
                            setProgressBarProgression(dailyProgressCounter)
                            setGoalFreqComplete(2)
                        }
                    })

                // Populate arrays for words written line graph
                if (progressArray.length !== 0) {
                    progressArray.forEach(progress => {
                        progressDateLabels.push(progress.dateEntered)
                        progressWordsWritten.push(progress.wordsWritten)
                    })
                }

                // If no progress on today's date, set as 0
                } else {
                    setGoalFreqComplete(0)
                    setGoalProgression(0)
                }
                break;

            case "weekly":
                // Set counter to 0
                let weeklyProgressCounter = 0

                // Calculate Progress Bar X-axis
                const howMuchToWriteThisMonth = daysPerFrequency * weeksInCurrentMonth

                setProgressBarXAxis(howMuchToWriteThisMonth)

                const weeklyProjects = incomingProgress.filter(each => each.project.goalFrequency === "weekly")
                const monthsWeeklyProgress = weeklyProjects.filter(each => {
                    // To ensure that the date entered is tested correctly, at least with console.logs, have to replace the - with /
                    const dateEntered = new Date(each.dateEntered)
                    const monthEntered = dateEntered.getMonth()
                    // Return only the progress in the current week
                    return monthEntered === currentMonthInt
                })
                // If we have progress for this week...
                if (monthsWeeklyProgress.length !== 0) {
                    // see if the goal has been met for each entered progress
                    monthsWeeklyProgress.forEach(progress => {

                        // Find the average words written
                        if (progress.wordsWritten) {
                            wordsWrittenArray.push(progress.wordsWritten)
                            progressArray.push(progress)
                        }
                        let total = 0
                        for (let i = 0; i < wordsWrittenArray.length; i++) {
                            total += wordsWrittenArray[i]
                        }
                        const wordAverage = total / wordsWrittenArray.length
                        const roundedAverage = Math.ceil(wordAverage)
                        setAverageWordsWritten(roundedAverage)

                        if (progress.wordsWritten >= wordCountGoal) {
                            ++weeklyProgressCounter
                            setProgressBarProgression(weeklyProgressCounter)
                        }
                        if (progress.wordsWritten < wordCountGoal && progress.proofread || progress.revised || progress.edited) {
                            ++weeklyProgressCounter
                            setProgressBarProgression(weeklyProgressCounter)
                        }
                    })

                    // Populate arrays for words written line graph
                    if (progressArray.length !== 0) {
                        progressArray.forEach(progress => {
                            progressDateLabels.push(progress.dateEntered)
                            progressWordsWritten.push(progress.wordsWritten)
                        })
                    }

                    // If the counter reaches the freq for the week, set complete
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
                // Create a counter for amount completed. Used in graph and progress checks
                let monthlyProgressCounter = 0

                setProgressBarXAxis(daysPerFrequency)

                // Get only the progress that matches today's date
                const monthlyProjects = incomingProgress.filter(each => each.project.goalFrequency === "monthly")
                const currentMonth = new Date(todaysDate).getMonth()
                // Match only progress that matches today's date
                const thisMonthsProgress = monthlyProjects.filter(each => {
                    const progressMonth = new Date(each.dateEntered).getMonth()
                    return progressMonth === currentMonth
                })
                if (thisMonthsProgress.length !== 0) {
                    // For each progress of this month, run the goal checks

                    thisMonthsProgress.forEach(progress => {
                        // Find the average words written
                        if (progress.wordsWritten) {
                            wordsWrittenArray.push(progress.wordsWritten)
                            progressArray.push(progress)
                        }
                        let total = 0
                        for (let i = 0; i < wordsWrittenArray.length; i++) {
                            total += wordsWrittenArray[i]
                        }
                        const wordAverage = total / wordsWrittenArray.length
                        const roundedAverage = Math.ceil(wordAverage)
                        setAverageWordsWritten(roundedAverage)


                        if (progress.wordsWritten >= wordCountGoal) {
                            // If we have progress, increase the counter, then setGoalProgression as the counter
                            ++monthlyProgressCounter
                            setProgressBarProgression(monthlyProgressCounter)
                        }
                        if (progress.wordsWritten < wordCountGoal && progress.proofread || progress.revised || progress.edited) {
                            ++monthlyProgressCounter
                            setProgressBarProgression(monthlyProgressCounter)
                        }
                    })

                    // Populate arrays for words written line graph
                    if (progressArray.length !== 0) {
                        progressArray.forEach(progress => {
                            progressDateLabels.push(progress.dateEntered)
                            progressWordsWritten.push(progress.wordsWritten)
                        })
                    }

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
        new Chart(progressBar.current, horizontalBar(progressBarProgression, progressBarXAxis));
        new Chart(wordsWrittenLine.current, {
            type: 'line',
            data: {
                // PROBABLY NEED TO FEED IN THE INCOMING PROGRESS
                
                // GENERATE LABELS FROM WHEN  PROGRESS WAS MADE
                labels: progressDateLabels,
                datasets: [{
                    // THE ARRAY OF WORDS WRITTEN 
                    data: progressWordsWritten,
                    label: "Words Written",
                    borderColor: "#76cdc7ff",
                    fill: true,
                    backgroundColor: "#c3e8e5ff",
                }
                ]
            },

            scales: {
                xAxes: [{
                    display: true,
                }],
                yAxes: [{
                    display: true,
                    min: 0,
                    max: 500
                }]
            },

            options: {
                tooltip: {
                    position: "nearest"
                },
                title: {
                display: false
                },
                scaleLineColor: "black",
                scaleBeginAtZero: true,
                responsive: true,
                maintainAspectRatio: false,
            }
        })
    }, [checkGoalProgress])

    return (
        <>

        <section className="card card__color--white card__dash card__dash--progressionBar">
        <h3 className="dash__h3 dash__h3--graph">Progress for month</h3>
            <div>
                <canvas ref={progressBar} id="progress__bar" width="40" height="40" />
            </div>
            <div className="graph__textContainer">
                <p className="graph__text">
                    Meeting goal {progressBarProgression} / {progressBarXAxis} days in this month
                </p>
            </div>
        </section>

        <section className="card card__color--white card__dash card__dash--average">
            <h3 className="dash__h3 dash__h3--average">Average words written</h3>
            <p className="graph__text">
                per writing session this month
            </p>
            <p className="average__text">
                {averageWordsWritten}
            </p>
        </section>

        <section className="card card__color--white card__dash card__dash--words">
            Words written for current month
            <div>
                <canvas ref={wordsWrittenLine} id="wordCount__line" width="50" height="200"/>
            </div>
        </section>

        </>
    )
}