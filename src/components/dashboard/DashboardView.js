import React, { useRef, useEffect, useState, useContext } from "react"
import { Link, useParams } from "react-router-dom"
import { ProgressContext } from "../progress/ProgressProvider"
import { ProjectContext } from "../projects/ProjectProvider"
import { TypeContext } from "../type/TypeProvider"
import { IconPlus } from "../icons/IconPlus"
import { IconDivider } from "../icons/IconDivider"
import { ProgressForm } from "../progress/ProgressForm"
import { Modal } from "../modal/Modal"
import { DashTitleCard } from "./DashTitleCard"
import { DashProgression } from "./DashProgression"
import { NoDefaultCard } from "../selectionCards/NoDefaultCard"
import { NoYearCard } from "../selectionCards/NoYearCard"
import { NoMonthCard } from "../selectionCards/NoMonthCard"
import "./Dashboard.css"

export const DashboardView = () => {

    // SESSION STORAGE
    const userId = +sessionStorage.getItem("userId")
    const defaultProject = +sessionStorage.getItem("defaultProject")

    const progressModal = useRef()
    const { projectId } = useParams()

    const { getTypes } = useContext(TypeContext)
    const { getProjectsWithoutStateUpdate, getProjectByParam } = useContext(ProjectContext)
    const { progress, getProgressByProjectId, getProgressByUserId } = useContext(ProgressContext)
    
    const [ retrievedProjects, setRetrievedProjects ] = useState()
    const [ currentProject, setCurrentProject ] = useState()
    const [ currentProgress, setCurrentProgress ] = useState([])

    // DROP-DOWN CODE FROM TABLEVIEW 
    // STATES FOR SORTING
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
    // END DROP-DOWN CODE FROM TABLEVIEW

    const displayProject = () => {
        // If we have progress, set state
        if (progress.length !== 0) {
            setCurrentProgress(progress)
        } else if (progress.length === 0) {
            setCurrentProgress(progress)
        }
    }

    const selectProject = e => {
        const bySelectedProject = retrievedProjects.find(project => project.id === +e.target.value)
        setCurrentProject(bySelectedProject)
    }

    useEffect(() => {
        getTypes()
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

    useEffect(() => {
        displayProject()
    }, [progress])

    // USEEFFECTS FROM TABLEVIEW
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

            <button className="project__btn"
                onClick={e => {
                        if (progressModal.current !== undefined) {
                            progressModal.current.className = "background__modal modal__active"
                        }
                    }
                }
                onMouseOver={e => {
                    e.currentTarget.firstElementChild.children[1].childNodes.forEach(svg => {
                        svg.classList.remove("icon__gray")
                        svg.classList.add("icon__hovered")

                    })
                }}
                onMouseOut={e => {
                    e.currentTarget.firstElementChild.children[1].childNodes.forEach(svg => {
                        svg.classList.remove("icon__hovered")
                        svg.classList.add("icon__gray")
                    })
                }}>
                    <IconPlus color="icon__gray" />
                    Add progress
                </button>

            <IconDivider color="icon__lightGray" />
            {
                retrievedProjects === undefined ? null : 
                <fieldset className="view__projectSelect">
                    <label className="projectSelect__label" htmlFor="projectSelect">Select project: </label>
                    <select className="projectSelect__select"
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
            }
            <IconDivider color="icon__lightGray" />
            {
                // If we have progress, create the drop-down menus
                progress === undefined ? null :
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
            }
        </section>

        <section className="view__container">
            <div className="dash__cards">
                {
                    currentProject === undefined ? <NoDefaultCard /> :
                        currentSelectedYear === undefined ? null :
                            currentSelectedYear === 0 ? <NoYearCard/> :
                                currentSelectedMonth === "0" ? <NoMonthCard/> :
                                    <>
                                    <DashTitleCard props={currentProject} />                   
                                    {
                                        currentProgress.length === 0 ? null :
                                            <DashProgression props={currentProject} progress={progressSortedMonthly}/>    
                                    }
                                    <Modal ref={progressModal} contentFunction={<ProgressForm project={currentProject} />} width={"modal__width--med"}/>
                                    
                                    <section className="card card__color--white card__link card__link--dash">
                                        <Link className="table__link" to={`/table/${currentProject.id}`}>
                                            {/* <IconGraph color="icon__lightGray" /> */}
                                            <h3 className="table__h3">View project on table</h3>
                                        </Link>
                                    </section>
                                    </>
                }
            </div>
        </section>
        </>
    )
}