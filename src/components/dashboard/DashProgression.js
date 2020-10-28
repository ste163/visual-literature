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
    
    // console.log("INCOMING PROGRESS", incomingProgress)

    // console.log("wordCountGoal", wordCountGoal)
    // console.log("goalFreq", goalFrequency)
    // console.log("daysPerFrequency", daysPerFrequency)

    // Goal progression check from progressCard
    const checkGoalProgress = () => {
        switch(goalFrequency) {
            case "daily":
                // Counter used for progress bar
                let dailyProgressCounter = 0

                // Array to store every wordWritten count, used for average
                let wordsWrittenDailyArray = []

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
                            wordsWrittenDailyArray.push(progress.wordsWritten)
                        }
                        let total = 0
                        for (let i = 0; i < wordsWrittenDailyArray.length; i++) {
                            total += wordsWrittenDailyArray[i]
                        }
                        const wordAverage = total / wordsWrittenDailyArray.length
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

                    // If no progress on today's date, set as 0
                } else {
                    setGoalFreqComplete(0)
                    setGoalProgression(0)
                }
                break;

            case "weekly":
                // Set counter to 0
                let weeklyProgressCounter = 0

                // Array to store every wordWritten count, used for average
                let wordsWrittenWeeklyArray = []

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
                            wordsWrittenWeeklyArray.push(progress.wordsWritten)
                        }
                        let total = 0
                        for (let i = 0; i < wordsWrittenWeeklyArray.length; i++) {
                            total += wordsWrittenWeeklyArray[i]
                        }
                        const wordAverage = total / wordsWrittenWeeklyArray.length
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

                // Array to store every wordWritten count, used for average
                let wordsWrittenMonthlyArray = []

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
                            wordsWrittenMonthlyArray.push(progress.wordsWritten)
                        }
                        let total = 0
                        for (let i = 0; i < wordsWrittenMonthlyArray.length; i++) {
                            total += wordsWrittenMonthlyArray[i]
                        }
                        const wordAverage = total / wordsWrittenMonthlyArray.length
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
        new Chart(progressBar.current, horizontalBar(progressBarProgression, progressBarXAxis));
        new Chart(wordsWrittenLine.current, {
            type: 'line',
            data: {
                labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
                datasets: [{ 
                    data: [86,114,106,106,107,111,133,221,783,2478],
                    label: "Africa",
                    borderColor: "#3e95cd",
                    fill: false
                }, { 
                    data: [282,350,411,502,635,809,947,1402,3700,5267],
                    label: "Asia",
                    borderColor: "#8e5ea2",
                    fill: false
                }, { 
                    data: [168,170,178,190,203,276,408,547,675,734],
                    label: "Europe",
                    borderColor: "#3cba9f",
                    fill: false
                }, { 
                    data: [40,20,10,16,24,38,74,167,508,784],
                    label: "Latin America",
                    borderColor: "#e8c3b9",
                    fill: false
                }, { 
                    data: [6,3,2,2,7,26,82,172,312,433],
                    label: "North America",
                    borderColor: "#c45850",
                    fill: false
                }
                ]
            },
            options: {
                title: {
                display: true,
                text: 'World population per region (in millions)'
                }
            }
        })
        checkGoalProgress()   
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
            <p className="average__text">
                {averageWordsWritten}
            </p>
            <p className="graph__text">
                    per frequency this month
            </p>
        </section>

        <section className="card card__color--white card__dash">
            Words written bar chart for current month
            <div>
                <canvas ref={wordsWrittenLine} id="wordCount__line" width="100" height="100" />
            </div>
        </section>

        </>
    )
}