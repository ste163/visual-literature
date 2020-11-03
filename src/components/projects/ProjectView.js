import React, { useRef, useEffect, useContext } from "react"
import { TypeContext } from "../type/TypeProvider"
import { ProjectContext } from "./ProjectProvider"
import { ProgressProvider } from "../progress/ProgressProvider"
import { ProjectForm } from "./ProjectForm"
import { ProjectCard } from "./ProjectCard"
import { Modal } from "../modal/Modal"
import { IconPlus } from "../icons/IconPlus"
import { IconDivider } from "../icons/IconDivider"
import { NoProjectCard } from "../selectionCards/NoProjectCard"

export const ProjectView = () => {
    const { projects, getProjects } = useContext(ProjectContext)

    // We getTypes for the forms on ProjectList load.
    // Types currently WILL NEVER change, so forms don't need the fetch.
    const { getTypes } = useContext(TypeContext)
    const activeUser = +sessionStorage.getItem("userId")
    
    const modal = useRef()

    useEffect(() => {
        getTypes()
        .then(getProjects(activeUser))
    }, [])

    return (
        <>
        <section className="view__header">
            <button className="project__btn"
            onClick={e => modal.current.className = "background__modal modal__active"}
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
                Create new project
            </button>

            <IconDivider color="icon__lightGray" />

            {/* <IconDivider color="icon__lightGray" />
            Cool Info About All Your Projects */}
        </section>

        <section className="view__container">
            <Modal ref={modal} contentFunction={<ProjectForm />} width={"modal__width--widest"}/>

            <div className="project__cards">
                {
                    projects.length === 0 ? <NoProjectCard /> :
                    <>
                    {                   
                        projects.map(project => {
                            return <ProgressProvider key={project.id}><ProjectCard key={project.id} project={project} /></ProgressProvider>
                        })               
                    }
                    </>
                }
            </div>
        </section>
        </>
    )
}