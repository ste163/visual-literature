import React, { useRef, useEffect, useState, useContext } from "react"
import { useParams, useHistory } from "react-router-dom"
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

export const Dashboard = () => {

    const activeUser = +sessionStorage.getItem("userId")
    const progressModal = useRef()
    const { projectId } = useParams()

    const { getTypes } = useContext(TypeContext)
    const { projects, getProjects, getProjectByParam } = useContext(ProjectContext)
    const { progress, getProgressByProjectId, getProgressByUserId } = useContext(ProgressContext)
    
    const [ currentProject, setCurrentProject ] = useState()
    const [ currentProgress, setCurrentProgress ] = useState([])

    const displayProject = () => {
        // If we have progress, set state
        if (progress.length !== 0) {
            setCurrentProgress(progress)
        }
        // If we have multiple projects, show first, else show selected 
        if (Array.isArray(projects)) {
            setCurrentProject(projects[0])
        } else {
            setCurrentProject(projects)
        }
    }

    useEffect(() => {
        getTypes()
        .then(() => {
            if (projectId) {
                getProjectByParam(projectId)
                .then(getProgressByProjectId(projectId))
            } else {
                getProjects(activeUser)
                .then(getProgressByUserId(activeUser))
            }
        })
    }, [])

    useEffect(() => {
        displayProject()
    }, [displayProject])

    return (
        <>
        <section className="view__header">

        <button className="project__btn"
            onClick={e => progressModal.current.className = "background__modal modal__active"}>
                <IconPlus color="icon__gray" />
                Add Progress
            </button>

        <IconDivider color="icon__lightGray" />

        {/* SELECT INPUT THAT POPULATES DROP DOWNS BASED ON AVAILABLE DATA.
        WILL NEED COMPLEX MAP FUNCTION TO CREATE SELECTS */}
        DISPLAY BY SELECTED DATE

        </section>

        <section className="view__container">
            {
                currentProject === undefined ? null :
                    <>
                        <DashTitleCard props={currentProject} />
            
                        <DashGoalCard props={currentProject} />
                        {
                            currentProgress.length === [] ? null :
                            <DashProgression props={currentProject} progress={currentProgress}/>    
                        }
                        
                        <Modal ref={progressModal} projectId={currentProject.id} fetchFunction={getProgressByProjectId}  contentFunction={<ProgressForm project={currentProject} />} width={"modal__width--wide"}/>
                    </>
            }
        </section>
        </>
    )
}