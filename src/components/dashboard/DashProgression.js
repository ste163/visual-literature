import React, { useState, useEffect, useRef } from "react"
import { getWeeksInMonth } from 'date-fns'
import { horizontalBar } from "../graphs/horizontalBar"
import { wordCountLine } from "../graphs/wordCountLine"
import Chart from 'chart.js'

// Will include ALL progress checks
// And display all data

export const DashProgression = (props, progress) => {

    // DATES
    const currentTime = new Date()
    const todaysDate = new Date(currentTime.getTime() - (currentTime.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    const currentMonthInt = currentTime.getMonth()
    const lastDayOfMonthFull = new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, 0)
    const lastDayOfMonthInt = lastDayOfMonthFull.getDate()
    const weeksInCurrentMonth = getWeeksInMonth(currentTime)

    // PROGRESS BAR
    const [ progressBarProgression, setProgressBarProgression] = useState()
    const [ progressBarXAxis, setProgressBarXAxis ] = useState()

    // AVERAGE WORDS WRITTEN
    const [ averageWordsWritten, setAverageWordsWritten ] = useState()
    let wordsWrittenArray = []

    // WORDS WRITTEN LINE GRAPH LABELS & DATA
    const [ lineWordsWrittenArray, setLineWordsWrittenArray ] = useState([])
    const [ lineWordsLabelArray, setLineWordsLabelArray ] = useState([])

    // PROJECT INFO
    const wordCountGoal = props.props.wordCountGoal
    const goalFrequency = props.props.goalFrequency
    const daysPerFrequency = props.props.daysPerFrequency

    // PROGRESS INFO, MUST USE A DEEP COPY OF PROGRESS
    // OR ELSE DATE SORTING OVERWRITES ALL PROGRESS
    const incomingProgress = props.progress

    // REFS
    const progressBar = useRef()
    const wordsWrittenLine = useRef()

    // LINE GRAPH DATA ARRAYS
    let progressArray = []

    // Goal progression check from progressCard
    const checkGoalProgress = () => {

        // Get only the selected project's progress
        const currentProjectsProgress = incomingProgress.filter(each => each.projectId === props.props.id)

        const findAverageWordsWritten = singleProgress => {
            if (singleProgress.wordsWritten) {
                progressArray.push(singleProgress)
                wordsWrittenArray.push(singleProgress.wordsWritten)
                let total = 0
                for (let i = 0; i < wordsWrittenArray.length; i++) {
                    total += wordsWrittenArray[i]
                }
                const wordAverage = total / wordsWrittenArray.length
                const roundedAverage = Math.ceil(wordAverage)
                setAverageWordsWritten(roundedAverage)
            } else {
                setAverageWordsWritten(0)
            }
        }

        const prepareDataForLineGraph = () => {
            if (progressArray.length !== 0) {
                let progressDateLabels = []
                let progressWordsWritten = []
                const arrayCopy = JSON.parse(JSON.stringify(progressArray))
                // Remove YEAR-MONTH-
                const yearMonthToRemove = arrayCopy[0].dateEntered.slice(0, 8)
                const progressWithShortenedDates = arrayCopy.map(each => {
                    each.dateEntered = +each.dateEntered.replace(yearMonthToRemove, "")
                    return each
                })
                // Sort progress by day
                const sortedProgress = progressWithShortenedDates.sort((a, b) => a.dateEntered - b.dateEntered)
                sortedProgress.forEach(singleProgress => {
                    progressDateLabels.push(singleProgress.dateEntered)
                    progressWordsWritten.push(singleProgress.wordsWritten)
                })
                setLineWordsLabelArray(progressDateLabels)
                setLineWordsWrittenArray(progressWordsWritten)
            }
        }
        
        // Check goal progression per project type
        switch(goalFrequency) {
            case "daily":
                // Counter used for progress bar
                let dailyProgressCounter = 0

                // Set progressBarXAxis to the current month
                setProgressBarXAxis(lastDayOfMonthInt)
                
                // Get only progress for daily projects
                const dailyProjects = currentProjectsProgress.filter(each => each.project.goalFrequency === "daily")
                if (dailyProjects.length !== 0) {
                    dailyProjects.forEach(singleProgress => {
                        findAverageWordsWritten(singleProgress)
                        // If more words written than the goal, set complete, if some progress made, set halfway
                        if (singleProgress.wordsWritten >= wordCountGoal) {
                            ++dailyProgressCounter
                        }
                        if (singleProgress.proofread || singleProgress.revised || singleProgress.edited) {
                            ++dailyProgressCounter
                        }
                    })
                    setProgressBarProgression(dailyProgressCounter)
                    prepareDataForLineGraph()
                } else if (dailyProjects.length === 0) {
                    findAverageWordsWritten("")
                    setProgressBarProgression(0)
                    prepareDataForLineGraph()
                }
                break;

            case "weekly":
                let weeklyProgressCounter = 0

                // Calculate Progress Bar X-axis
                const howMuchToWriteThisMonth = daysPerFrequency * weeksInCurrentMonth
                setProgressBarXAxis(howMuchToWriteThisMonth)

                const weeklyProjects = currentProjectsProgress.filter(each => each.project.goalFrequency === "weekly")

                if (weeklyProjects.length !== 0) {
                    weeklyProjects.forEach(singleProgress => {
                        findAverageWordsWritten(singleProgress)
                        if (singleProgress.wordsWritten >= wordCountGoal) {
                            ++weeklyProgressCounter
                        }
                        if (singleProgress.wordsWritten < wordCountGoal && singleProgress.proofread || singleProgress.revised || singleProgress.edited) {
                            ++weeklyProgressCounter
                        }
                    })
                    setProgressBarProgression(weeklyProgressCounter)
                    prepareDataForLineGraph()
                } else if (weeklyProjects.length === 0) {
                    findAverageWordsWritten("")
                    setProgressBarProgression(0)
                    prepareDataForLineGraph()
                }
                break;
                
            case "monthly":
                let monthlyProgressCounter = 0

                setProgressBarXAxis(daysPerFrequency)

                const monthlyProjects = currentProjectsProgress.filter(each => each.project.goalFrequency === "monthly")

                if (monthlyProjects.length !== 0) {
                    monthlyProjects.forEach(singleProgress => {
                        findAverageWordsWritten(singleProgress)
                        if (singleProgress.wordsWritten >= wordCountGoal) {
                            ++monthlyProgressCounter
                        }
                        if (singleProgress.wordsWritten < wordCountGoal && singleProgress.proofread || singleProgress.revised || singleProgress.edited) {
                            ++monthlyProgressCounter
                        } 
                    })
                    setProgressBarProgression(monthlyProgressCounter)
                    prepareDataForLineGraph()
                } else if (monthlyProjects.length === 0) {
                    findAverageWordsWritten("")
                    setProgressBarProgression(0)
                    prepareDataForLineGraph()
                }
                break;
        }
    }

    useEffect(() => {
        checkGoalProgress()
        new Chart(progressBar.current, horizontalBar(progressBarProgression, progressBarXAxis));
        new Chart(wordsWrittenLine.current, wordCountLine(lineWordsLabelArray, lineWordsWrittenArray))
    }, [incomingProgress, progressBarProgression])

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
            Words written per day for this month
            <div>
                <canvas ref={wordsWrittenLine} id="wordCount__line" width="50" height="200"/>
            </div>
        </section>
        </>
    )
}