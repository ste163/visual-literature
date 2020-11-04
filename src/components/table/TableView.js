import React, { useContext, useEffect, useState, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import { TypeContext } from "../type/TypeProvider"
import { ProjectContext } from "../projects/ProjectProvider"
import { ProgressContext } from "../progress/ProgressProvider"
import { IconDivider } from "../icons/IconDivider"
import { NoDefaultCard } from "../selectionCards/NoDefaultCard"
import { NoYearCard } from "../selectionCards/NoYearCard"
import { NoMonthCard } from "../selectionCards/NoMonthCard"
import { Modal } from "../modal/Modal"
import { ProgressForm } from "../progress/ProgressForm"
import { Table } from "./Table"
import "./TableView.css"

export const TableView = () => {

    // SESSION STORAGE
    const userId = +sessionStorage.getItem("userId")
    const defaultProject = +sessionStorage.getItem("defaultProject")

    const { projectId } = useParams()

    const { getTypes } = useContext(TypeContext)
    const { getProjectsWithoutStateUpdate } = useContext(ProjectContext)
    const { progress, getProgressByProjectId } = useContext(ProgressContext)

    // DATES
    const currentTime = new Date()
    const todaysDate = new Date(currentTime.getTime() - (currentTime.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    const currentMonthInt = currentTime.getMonth()
    const currentYear = new Date(`${todaysDate} 00:00:00`).getFullYear()
    const firstDayOfMonthFull =  new Date(currentTime.getFullYear(), currentTime.getMonth(), 1)
    const lastDayOfMonthFull = new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, 0)
    const lastDayOfMonthInt = lastDayOfMonthFull.getDate()

    // CONVERT MONTH NUMBER TO STRING
    const convertMonthIntToString = monthInt => {
        const date = new Date()
        date.setMonth(monthInt)
        const monthString = date.toLocaleDateString("default", {month: "long"})
        return monthString
    }

    // CONVERT MONTH STRING BACK INTO A NUMBER
    const convertMonthStringToInt = monthString => {
        return new Date(Date.parse(monthString +"1, 2020")).getMonth()
    }

    // STATE
    const [ currentProject, setCurrentProject ] = useState()
    const [ retrievedProjects, setRetrievedProjects ] = useState([])
    const [ progressYearOptions, setProgressYearOptions ] = useState([])
    const [ progressSortedYearly, setProgressSortedYearly ] = useState([])
    const [ progressMonthOptions, setProgressMonthOptions ] = useState([])
    const [ progressSortedMonthly, setProgressSortedMonthly ] = useState([])

    // STATE FOR DROP-DOWNS
    const [ currentSelectedYear, setCurrentSelectedYear ] = useState()
    const [ currentSelectedMonth, setCurrentSelectedMonth ] = useState() 

    // REFS FOR DROP-DOWN MENUS
    const yearSelect = useRef()
    const monthSelect = useRef()

    // NOT USED, BUT NEEDED FOR MODAL
    const progressModal = useRef()

    // GENERATE OPTIONS FOR DROP-DOWN MENU
    const selectProject = e => {
        const bySelectedProject = retrievedProjects.find(project => project.id === +e.target.value)
        setCurrentProject(bySelectedProject)
    }

    const generateProgressYearOptions = () => {
        // Loop through all progress and grab the years we have progress for
        let yearsAvailableArray = []
        progress.forEach(singleProgress => {
            // Get the years we have progress for
            const yearOption = new Date(`${singleProgress.dateEntered} 00:00:00`).getFullYear()
            // Check if year is in array
            if (yearsAvailableArray.length === 0) {
                yearsAvailableArray.push(yearOption)
            } else {
                yearsAvailableArray.forEach(singleYear => {
                    if (singleYear !== yearOption) {
                        yearsAvailableArray.push(yearOption)
                    }
                })
            }
        })
        // Removes duplicate years
        const uniqueYears = [... new Set(yearsAvailableArray.sort().reverse())]
        setProgressYearOptions(uniqueYears)
    }

    // BASED ON DROP DOWN SELECTION, GET PROGRESS FOR THAT YEAR
    const sortProgressByYear = () => {
        if (yearSelect.current !== undefined) {
            const selectedYear = +yearSelect.current.value
            if (selectedYear !== 0) {
                const progressForSelectedYear = progress.filter(singleProgress => {
                    const progressYear = new Date(`${singleProgress.dateEntered} 00:00:00`).getFullYear()
                    if (progressYear === selectedYear) {
                        return singleProgress
                    }
                })
                setCurrentSelectedYear(selectedYear)
                setProgressSortedYearly(progressForSelectedYear)
            } else {
                setCurrentSelectedYear(+yearSelect.current.value)
            }
        }
    }

    const generateProgressMonthOptions = () => {
        let monthsAvailableArray = []
        progressSortedYearly.forEach(singleProgress => {
            const monthOption = new Date(`${singleProgress.dateEntered} 00:00:00`).getMonth()
            monthsAvailableArray.push(convertMonthIntToString(monthOption))
        })
        // Remove duplicate months
        const uniqueMonths = [... new Set(monthsAvailableArray.sort())]
        setProgressMonthOptions(uniqueMonths)
    }

    const sortProgressByMonth = () => {
        // FILTER PROGRESS FOR SELECTED MONTH IN THAT YEAR
        if (monthSelect.current !== undefined) {
            if (monthSelect.current.value !== "0") {
                const selectedMonth = monthSelect.current.value
                // RE-CONVERT THE MONTH STRING BACK INTO NUMBER
                const convertedSelectedMonth = convertMonthStringToInt(selectedMonth)
                const progressForSelectedMonth = progressSortedYearly.filter(singleProgress => {
                    const progressMonth = new Date(`${singleProgress.dateEntered} 00:00:00`).getMonth()
                    if (progressMonth === convertedSelectedMonth) {
                        return singleProgress
                    }
                })
                const sortInDescendingOrder = progressForSelectedMonth.sort((a,b) => Date.parse(b.dateEntered) - Date.parse(a.dateEntered)).reverse()
                setProgressSortedMonthly(sortInDescendingOrder)
                setCurrentSelectedMonth(monthSelect.current.value)
            } else {
                setCurrentSelectedMonth(monthSelect.current.value)
            }
        }
    }

    // FETCH INFO FOR SELECTED PROJECT & CURRENT PROGRESS FOR SELECTED PROJECT
    useEffect(() => {
        getTypes()
        // THEN get the progress for that project
        .then(() => {
            getProjectsWithoutStateUpdate(userId)
            .then(allProjects => {
                const byProjectId = allProjects.find(project => project.id === +projectId)
                const byDefaultProject = allProjects.find(project => project.id === defaultProject)
                if (byProjectId) {
                    setRetrievedProjects(allProjects)
                    setCurrentProject(byProjectId)
                } else if (!byProjectId && byDefaultProject) {
                    setRetrievedProjects(allProjects)
                    setCurrentProject(byDefaultProject)
                } else if (!byProjectId && !byDefaultProject) {
                    setRetrievedProjects(allProjects)
                }
            })
        })
    }, [])

    // When user selects from drop down, get progress for selection
    useEffect(() => {
        if (currentProject !== undefined) {
            getProgressByProjectId(currentProject.id)
        }
    }, [currentProject])

    // When progress state updates, re-sort drop-down menus
    useEffect(() => {
        generateProgressYearOptions()
    }, [progress])

    // When progressYears changes, sort progress for that year
    useEffect(() => {
        sortProgressByYear()
    }, [progressYearOptions])

    // After getting sorted yearly progress, populate drop-down for months
    useEffect(() => {
        generateProgressMonthOptions()
    }, [progressSortedYearly])

    // When a month is selected, get data for that month
    useEffect(() => {
        sortProgressByMonth()
    }, [progressMonthOptions])

    return (
        <>
        <section className="view__header">
            {
                retrievedProjects === undefined ? null : 
                <>
                <fieldset className="view__projectSelect">
                    <label className="projectSelect__label" htmlFor="projectSelect">Select project: </label>
                    <select className="projectSelect__select" name="projectSelect" id="projectSelect"
                    value={currentProject === undefined ? 0 : currentProject.id} 
                    onChange={e => selectProject(e)}>
                        <option value="0">Select project</option>
                        {
                            retrievedProjects.map(project => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))
                        }
                    </select>
                </fieldset>
                </>
            }
            <IconDivider color="icon__lightGray" />
            {
                progress === undefined ? null :
                <>
                <fieldset className="view__sort">
                {
                    progressYearOptions.length === 0 ? null :
                    <>
                    <label className="sort__label" htmlFor="year">View by year: </label>
                    <select className="sort__select sort__select--year" name="year" id="year"
                    ref={yearSelect}
                    defaultValue={progressYearOptions[0]} 
                    onChange={e => sortProgressByYear()}>
                        <option value="0">Year</option>
                        {
                            progressYearOptions.map(year => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))
                        }
                    </select>
                    </>
                }
                {
                    progressMonthOptions.length === 0 ? null :
                    <>
                    <label className="sort__label" htmlFor="month">View by month: </label>
                    <select className="sort__select" name="month" id="month"
                    ref={monthSelect}
                    defaultValue={progressMonthOptions[0]}
                    onChange={e => sortProgressByMonth()}>
                        <option value="0">Month</option>
                        {
                            progressMonthOptions.map(month => (
                                <option key={month} value={month}>
                                    {month}
                                </option>
                            ))
                        }
                    </select>
                    </>
                }
                </fieldset>
                </>
            }
            <IconDivider color="icon__lightGray" />
        </section>


        <section className="view__container">
            <div className="table__container">
                {
                    currentProject === undefined ? <NoDefaultCard/> : 
                        currentSelectedYear === undefined ? null :
                            currentSelectedYear === 0 ? <NoYearCard/> :
                                currentSelectedMonth === "0" ? <NoMonthCard/> :
                                    <>
                                    <Table props={currentProject} progress={progressSortedMonthly}/>
                                    <Modal ref={progressModal} width={"modal__width--med"} contentFunction={<ProgressForm project={currentProject} />} />
                                    <section className="card card__color--white card__link">
                                    <Link className="table__link" to={`/dashboard/${currentProject.id}`}>
                                        <h3 className="table__h3">View project on dashboard</h3>
                                    </Link>

                                    </section>
                                    </>
                }
            </div>
        </section>
        </>
    )
}