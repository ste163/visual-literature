import React, { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { TypeContext } from "../type/TypeProvider"
import { ProjectContext } from "../projects/ProjectProvider"
import { ProgressContext } from "../progress/ProgressProvider"
import { IconDivider } from "../icons/IconDivider"
import { Table } from "./Table"
import "./TableView.css"

export const TableView = () => {

    // SESSION STORAGE
    const userId = +sessionStorage.getItem("userId")
    const defaultProject = +sessionStorage.getItem("defaultProject")

    const { projectId } = useParams()

    const { getTypes } = useContext(TypeContext)
    const { projects, getProjectsWithoutStateUpdate } = useContext(ProjectContext)
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


    // FETCH INFO FOR SELECTED PROJECT & CURRENT PROGRESS FOR SELECTED PROJECT
    useEffect(() => {
        getTypes()
        // To have project selection available,
        // Must get ALL projects
        // THEN sort by matching project based on params/defaultProjects
        // THEN get the progress for that project
        .then(() => {
            getProjectsWithoutStateUpdate(userId)
            .then(allProjects => {
                const byProjectId = allProjects.find(project => project.id === +projectId)
                const byDefaultProject = allProjects.find(project => project.id ===  defaultProject)
                console.log(byDefaultProject)
                if (byProjectId) {
                    console.log("PROJECT BY PARAM")
                    setRetrievedProjects(allProjects)
                    setCurrentProject(byProjectId)
                } else if (!byProjectId && byDefaultProject) {
                    console.log("NO PARAM, BUT A DEFAULT")
                    setRetrievedProjects(allProjects)
                    setCurrentProject(byDefaultProject)
                } else if (!byProjectId && !byDefaultProject) {
                    console.log("NO DEFAULT, NO PARAM")
                    setRetrievedProjects(allProjects)
                    // SHOW CARD FOR SELECTING A PROJECT
                }
            })
        })
    }, [])

    return (
        <>
        <section className="view__header">
            <fieldset className="view__projectSelect">
                <label className="projectSelect__label" htmlFor="projectSelect">Select project: </label>
                <select className="projectSelect__select">
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

            <IconDivider color="icon__lightGray" />

            <fieldset className="view__sort">
            <label className="sort__label" htmlFor="month">View by month: </label>
            <select className="sort__select" name="month" id="month">
                <option value="CurrentMonth">November</option>
            </select>
            <label className="sort__label" htmlFor="year">View by year: </label>
            <select className="sort__select sort__select--year" name="year" id="year">
                <option value="currentYear">2020</option>
            </select>
            </fieldset>

            <IconDivider color="icon__lightGray" />
        </section>

        <section className="view__container">
            <div className="table__container">
                {
                    currentProject === undefined ? null : <Table props={currentProject}/>
                }
            </div>
        </section>
        </>
    )
}