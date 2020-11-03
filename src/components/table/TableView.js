import React, { useContext, useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { TypeContext } from "../type/TypeProvider"
import { ProjectContext } from "../projects/ProjectProvider"
import { ProgressContext } from "../progress/ProgressProvider"
import { IconDivider } from "../icons/IconDivider"
import { NoDefaultCard } from "../settings/NoDefaultCard"
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

    // STATE
    const [ currentProject, setCurrentProject ] = useState()
    const [ retrievedProjects, setRetrievedProjects ] = useState([])
    const [ progressYears, setProgressYears ] = useState()
    const [ progressSortedYearly, setProgressSortedYearly ] = useState([])

    // REFS FOR DROP-DOWN MENUS
    const yearSelect = useRef()

    // GENERATE OPTIONS FOR DROP-DOWN MENU
    const selectProject = e => {
        const bySelectedProject = retrievedProjects.find(project => project.id === +e.target.value)
        setCurrentProject(bySelectedProject)
    }

    const progressYearOptions = () => {
        // Loop through all progress and grab the years we have progress for
        let yearsAvailableArray = []
        progress.forEach(singleProgress => {
            const yearOption = new Date(`${singleProgress.dateEntered} 00:00:00`).getFullYear()
            // CHECK IF THE YEAR IS ALREADY IN THE ARRAY. IF IT IS, DO NOT PUSH IT
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
        // Remove duplicate years
        const uniqueYears = [... new Set(yearsAvailableArray.sort().reverse())]
        setProgressYears(uniqueYears)
    }

    // BASED ON DROP DOWN SELECTION, GET PROGRESS FOR THAT YEAR
    const sortProgressByYear = () => {
        if (yearSelect.current !== undefined) {
            const selectedYear = +yearSelect.current.value
            console.log(selectedYear)
            if (selectedYear !== 0) {
                const progressForSelectedYear = progress.filter(singleProgress => {
                    const progressYear = new Date(`${singleProgress.dateEntered} 00:00:00`).getFullYear()
                    if (progressYear === selectedYear) {
                        return singleProgress
                    }
                })
                console.log("PROGRESS FOR YEAR", progressForSelectedYear)
            }
            // IF NO YEAR SELECTED, THEN SAY, CHOOSE YEAR
        }
    }

    const sortProgressByMonth = e => {
        // BASED ON SELECT YEAR, FILL DROP DOWNS WITH THAT MONTH
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
        progressYearOptions()
        sortProgressByYear()
    }, [progress])

    // When progressYears changes, sort progress for that year
    useEffect(() => {
        sortProgressByYear()
    }, [progressYears])

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
                <label className="sort__label" htmlFor="month">View by month: </label>
                <select className="sort__select" name="month" id="month"
                onChange={e => sortProgressByMonth()}>
                    <option value="0">Month</option>
                    <option value="1">Test</option>
                </select>

                {
                    progressYears === undefined ? null :
                    progressYears.length === 0 ? null :
                    <>
                    <label className="sort__label" htmlFor="year">View by year: </label>
                    <select className="sort__select sort__select--year" name="year" id="year"
                    ref={yearSelect}
                    defaultValue={progressYears[0]} 
                    onChange={e => sortProgressByYear(e)}>
                        
                        <option value="0">Year</option>
                        {
                            progressYears.map(year => (
                                <option key={year} value={year}>
                                    {year}
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
                    currentProject === undefined ? <NoDefaultCard/> : <Table props={currentProject}/>
                }
            </div>
        </section>
        </>
    )
}