import React, { useState, useEffect, useRef } from "react"
import { isSameWeek, getWeeksInMonth } from 'date-fns'
import Chart from 'chart.js'
import { horizontalBar } from "../graphs/horizontalBar"
import { wordCountLine } from "../graphs/wordCountLine"

// Will include ALL progress checks
// And display all data

export const DashProgression = (props, progress) => {

    // DATES
    const currentTime = new Date()
    const todaysDate = new Date(currentTime.getTime() - (currentTime.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    const currentMonthInt = currentTime.getMonth()
    const firstDayOfMonthFull =  new Date(currentTime.getFullYear(), currentTime.getMonth(), 1)
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

    // PROGRESS INFO
    const incomingProgress = props.progress

    // REFS
    const progressBar = useRef()
    const wordsWrittenLine = useRef()

    // LINE GRAPH DATA ARRAYS
    let progressArray = []
    let progressDateLabels = []
    let progressWordsWritten = []

    // Goal progression check from progressCard
    const checkGoalProgress = () => {

        // Get only the selected project's progress
        const currentProjectsProgress = incomingProgress.filter(each => each.projectId === props.props.id)

        // Get only this month's progress
        const currentMonthsProgress = (progress) => {
            const dateEntered = new Date(progress.dateEntered).getMonth()
            return dateEntered === currentMonthInt
        }

        const findAverageWordsWritten = (progress) => {
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
        }

        const prepareDataForLineGraph = () => {
            // Remove YEAR-MONTH-
            const yearMonthToRemove = todaysDate.slice(0, 8)
            const progressWithShortenedDates = progressArray.map(each => {
                each.dateEntered = +each.dateEntered.replace(yearMonthToRemove, "")
                return each
            })
            // Sort progress by day
            const sortedProgress = progressWithShortenedDates.sort((a, b) => a.dateEntered - b.dateEntered)
            if (sortedProgress.length !== 0) {
                sortedProgress.forEach(progress => {
                    progressDateLabels.push(progress.dateEntered)
                    progressWordsWritten.push(progress.wordsWritten)
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
                // then only for this month
                const dailyProjects = currentProjectsProgress.filter(each => each.project.goalFrequency === "daily")
                const monthsDailyProgress = dailyProjects.filter(each => currentMonthsProgress(each))

                if (monthsDailyProgress.length !== 0) {
                    monthsDailyProgress.forEach(progress => {
                        findAverageWordsWritten(progress)
                        // If more words written than the goal, set complete, if some progress made, set halfway
                        if (progress.wordsWritten >= wordCountGoal) {
                            ++dailyProgressCounter
                        }
                        if (progress.proofread || progress.revised || progress.edited) {
                            ++dailyProgressCounter
                        }
                    })
                    setProgressBarProgression(dailyProgressCounter)
                    prepareDataForLineGraph()
                }
                break;

            case "weekly":
                let weeklyProgressCounter = 0

                // Calculate Progress Bar X-axis
                const howMuchToWriteThisMonth = daysPerFrequency * weeksInCurrentMonth
                setProgressBarXAxis(howMuchToWriteThisMonth)

                const weeklyProjects = currentProjectsProgress.filter(each => each.project.goalFrequency === "weekly")
                const monthsWeeklyProgress = weeklyProjects.filter(each => currentMonthsProgress(each))

                if (monthsWeeklyProgress.length !== 0) {
                    monthsWeeklyProgress.forEach(progress => {
                        findAverageWordsWritten(progress)
                        if (progress.wordsWritten >= wordCountGoal) {
                            ++weeklyProgressCounter
                        }
                        if (progress.wordsWritten < wordCountGoal && progress.proofread || progress.revised || progress.edited) {
                            ++weeklyProgressCounter
                        }
                    })
                    setProgressBarProgression(weeklyProgressCounter)
                    prepareDataForLineGraph()
                }
                break;
                
            case "monthly":
                let monthlyProgressCounter = 0

                setProgressBarXAxis(daysPerFrequency)

                const monthlyProjects = currentProjectsProgress.filter(each => each.project.goalFrequency === "monthly")
                const thisMonthsProgress = monthlyProjects.filter(each => currentMonthsProgress(each))

                if (thisMonthsProgress.length !== 0) {
                    thisMonthsProgress.forEach(progress => {
                        findAverageWordsWritten(progress)
                        if (progress.wordsWritten >= wordCountGoal) {
                            ++monthlyProgressCounter
                        }
                        if (progress.wordsWritten < wordCountGoal && progress.proofread || progress.revised || progress.edited) {
                            ++monthlyProgressCounter
                        } 
                    })
                    setProgressBarProgression(monthlyProgressCounter)
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
            Words written for current month
            <div>
                <canvas ref={wordsWrittenLine} id="wordCount__line" width="50" height="200"/>
            </div>
        </section>
        </>
    )
}