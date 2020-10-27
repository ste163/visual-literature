import React from "react"
import { isSameWeek } from 'date-fns'

// Will include ALL progress checks
// And display all data

export const DashProgression = (props, progress) => {
    
    
    const wordCountGoal = props.props.wordCountGoal
    const goalFrequency = props.props.goalFrequency
    const daysPerFrequency = props.props.daysPerFrequency
    const incomingProgress = props.progress
    
    console.log("INCOMING PROGRESS", incomingProgress)

    // console.log("wordCountGoal", wordCountGoal)
    // console.log("goalFreq", goalFrequency)
    // console.log("daysPerFrequency", daysPerFrequency)

    // Goal progression check from progressCard
    // const checkGoalProgress = () => {
    //     switch(goalFrequency) {
    //         case "daily":
    //             // Get only progress for projects that are daily
    //             const dailyProjects = progress.filter(each => each.project.goalFrequency === "daily")
    //             // Get only the progress that matches today
    //             const todaysProgress = dailyProjects.filter(each => each.dateEntered === todaysDate)
    //             if (todaysProgress.length !== 0) {
    //                 // If the progress we have matches today's date, run the block
    //                 if (todaysProgress[0].dateEntered === todaysDate) {
    //                     // If more words written than the goal, set complete, if some progress made, set halfway
    //                     if (todaysProgress[0].wordsWritten >= wordCountGoal) {
    //                         setGoalProgression(1)
    //                         setGoalFreqComplete(2)
    //                     } else {
    //                         setGoalProgression(0.5)
    //                         setGoalFreqComplete(1)
    //                     }
    //                     if (todaysProgress[0].proofread || todaysProgress[0].revised || todaysProgress[0].edited) {
    //                         setGoalProgression(1)
    //                         setGoalFreqComplete(2)
    //                     }
    //                 }
    //                 // If no progress on today's date, set as 0
    //             } else {
    //                 setGoalFreqComplete(0)
    //                 setGoalProgression(0)
    //             }
    //             break;

    //         case "weekly":
    //             let weeklyProgressCounter = 0
    //             const weeklyProjects = progress.filter(each => each.project.goalFrequency === "weekly")
    //             const thisWeeksProgress = weeklyProjects.filter(each => {
    //                 // To ensure that the date entered is tested correctly, at least with console.logs, have to replace the - with /
    //                 const progressDate = new Date(each.dateEntered.replace(/-/g, '\/'))
    //                 // Return only the progress in the current week
    //                 return isSameWeek(progressDate, currentDate)
    //             })
    //             // If we have progress for this week...
    //             if (thisWeeksProgress.length !== 0) {
    //                 // see if the goal has been met for each entered progress
    //                 thisWeeksProgress.forEach(progress => {
    //                     if (progress.wordsWritten >= wordCountGoal) {
    //                         ++weeklyProgressCounter
    //                         setGoalProgression(weeklyProgressCounter)
    //                     }
    //                     if (progress.wordsWritten < wordCountGoal && progress.proofread || progress.revised || progress.edited) {
    //                         ++weeklyProgressCounter
    //                         setGoalProgression(weeklyProgressCounter)
    //                     }
    //                 })
    //                 // If the counter reaches the freq for the week, set complete
    //                 if (weeklyProgressCounter >= daysPerFrequency) {
    //                     setGoalFreqComplete(2)
    //                 }  else if (weeklyProgressCounter < daysPerFrequency) {
    //                     setGoalFreqComplete(1)
    //                 }
    //             } else {
    //                 setGoalFreqComplete(0)
    //                 setGoalProgression(0)
    //             }
    //             break;
                
    //         case "monthly":
    //             // Create a counter for amount completed. Used in graph and progress checks
    //             let monthlyProgressCounter = 0
    //             // Get only the progress that matches today's date
    //             const monthlyProjects = progress.filter(each => each.project.goalFrequency === "monthly")
    //             const currentMonth = new Date(todaysDate).getMonth()
    //             // Match only progress that matches today's date
    //             const thisMonthsProgress = monthlyProjects.filter(each => {
    //                 const progressMonth = new Date(each.dateEntered).getMonth()
    //                 return progressMonth === currentMonth
    //             })
    //             if (thisMonthsProgress.length !== 0) {
    //                 // For each progress of this month, run the goal checks
    //                 thisMonthsProgress.forEach(progress => {
    //                     if (progress.wordsWritten >= wordCountGoal) {
    //                         // If we have progress, increase the counter, then setGoalProgression as the counter
    //                         ++monthlyProgressCounter
    //                         setGoalProgression(monthlyProgressCounter)
    //                     }
    //                     if (progress.wordsWritten < wordCountGoal && progress.proofread || progress.revised || progress.edited) {
    //                         ++monthlyProgressCounter
    //                         setGoalProgression(monthlyProgressCounter)
    //                     }
    //                 })
    //                 // If the counter reaches the freq for the month, set complete
    //                 if (monthlyProgressCounter >= daysPerFrequency) {
    //                     setGoalFreqComplete(2)
    //                 }  else if (monthlyProgressCounter < daysPerFrequency) {
    //                     setGoalFreqComplete(1)
    //                 }
    //             } else {
    //                 setGoalFreqComplete(0)
    //                 setGoalProgression(0)
    //             }
    //             break;
    //     }
    // }



    return (
        <>

        <section className="card card__color--white card__dash">
            Single progression bar chart for how you're doing meeting goals out of current month
        </section>

        <section className="card card__color--white card__dash">
            Goal progression bar chart, similar to the one on the progression menu, but vertical and not combined.
            X axis based on the frequency? Or how many weeks in the month?
        </section>

        <section className="card card__color--white card__dash">
            Words written bar chart for current month
        </section>

        </>
    )
}