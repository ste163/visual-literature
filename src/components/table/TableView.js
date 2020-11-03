import React, { useContext, useEffect, useState } from "react"
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
    const firstDayOfMonthFull =  new Date(currentTime.getFullYear(), currentTime.getMonth(), 1)
    const lastDayOfMonthFull = new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, 0)
    const lastDayOfMonthInt = lastDayOfMonthFull.getDate()

    // STATE
    const [ currentProject, setCurrentProject ] = useState()
    const [ retrievedProjects, setRetrievedProjects ] = useState([])
    const [ progressSorted, setProgressSorted ] = useState([])

    const selectProject = e => {
        const bySelectedProject = retrievedProjects.find(project => project.id === +e.target.value)
        setCurrentProject(bySelectedProject)
    }

    // GET ALL THE PROGRESS
    // GET THE CURRENT YEAR, AND SET THAT AS THE DEFAULT
    // THEN, BASED ON THAT YEAR, POPULATE THE DROP DOWNS WITH MONTHS FOR THAT YEAR
    
    const sortProgressByYear = e => {
        console.log("ALL PROGRESS FOR YEAR", progress)
    }

    const sortProgressByMonth = e => {
        console.log("ALL PROGRESS", progress)
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
                onChange={e => sortProgressByMonth(e)}>
                    <option value="0">Month</option>
                    <option value="1">Test</option>
                </select>
                <label className="sort__label" htmlFor="year">View by year: </label>
                <select className="sort__select sort__select--year" name="year" id="year"
                onChange={e => sortProgressByYear(e)}>
                    <option value="0">Year</option>
                </select>
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