import React, { useRef, useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { ProgressContext } from "../progress/ProgressProvider"
import { ProjectContext } from "../projects/ProjectProvider"
import { TypeContext } from "../type/TypeProvider"
import { IconPlus } from "../icons/IconPlus"
import { IconDivider } from "../icons/IconDivider"
import { ProgressForm } from "../progress/ProgressForm"
import { Modal } from "../modal/Modal"
import { DashTitleCard } from "./DashTitleCard"
import { DashGoalCard } from "./DashGoalCard"
import { DashProgression } from "./DashProgression"
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
                    console.log("PROJ BY PARAM")
                    setRetrievedProjects(allProjects)
                    setCurrentProject(byProjectId)
                } else if (!byProjectId && byDefaultProject) {
                    console.log("PROJ BY DEFAULT")
                    setRetrievedProjects(allProjects)
                    setCurrentProject(byDefaultProject)
                } else if (!byProjectId && !byDefaultProject) {
                    console.log("MUST SELECT A PROJ")
                    setRetrievedProjects(allProjects)
                    // SHOW CARD FOR SELECTING A PROJECT
                }
            })
        })
    }, [])

    useEffect(() => {
        displayProject()
    }, [progress])

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
                <>
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
                </>
            }

            {/* SELECT INPUT THAT POPULATES DROP DOWNS BASED ON AVAILABLE DATA.
            WILL NEED COMPLEX MAP FUNCTION TO CREATE SELECTS */}

        </section>

        <section className="view__container">
            <div className="dash__cards">
                {
                    currentProject === undefined ? null :
                        <>
                            <DashTitleCard props={currentProject} />
                
                            <DashGoalCard props={currentProject} />
                            {
                                currentProgress.length === 0 ? null :
                                    <DashProgression props={currentProject} progress={currentProgress}/>    
                            }
                            <Modal ref={progressModal} contentFunction={<ProgressForm project={currentProject} />} width={"modal__width--med"}/>
                        </>
                }
            </div>
        </section>
        </>
    )
}