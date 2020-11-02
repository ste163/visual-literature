import React, {useContext, useEffect, useRef} from "react"
import { ProgressCard } from "../progress/ProgressCard"
import { ProgressContext } from "../progress/ProgressProvider"
import { Link } from "react-router-dom"
import { IconGraph } from "../icons/IconGraph"
import { DotMenu } from "./ProjectDotMenu"
import "./ProjectCard.css"

// To get the colors to change on icon hover,
// will need an on mouseEnter and on mouseLeave event
// That changes the color class.

export const ProjectCard = ({project}) => {
    
    const dotMenu = useRef()

    const { progress, getProgressByProjectId } = useContext(ProgressContext)

    const wordCountGoal = project.wordCountGoal
    const goalFrequency = project.goalFrequency
    const daysPerFrequency = project.daysPerFrequency

    useEffect(() => {
        getProgressByProjectId(project.id)
    }, [])

    return (
        <article className="card card__color--white card__project">
            <DotMenu ref={dotMenu} project={project}/>

            <h2 className="project__h2--card">{project.name}</h2>
            <div className="project__subtitle--container">
                <div className="project__subtitle project__subtitle--type">{project.type.name}</div>
                <div className="project__subtitle project__subtitle--date">Started on {project.dateStarted}</div>
            </div>
            <div className="project__goal">
                <h3 className="project__h3--card">Goal</h3>
                <p className="project__p">{wordCountGoal} words
                    {goalFrequency === "daily" ? ` ${goalFrequency}` : 
                        `${goalFrequency === "weekly" ? ` ${daysPerFrequency} days per week` :
                            ` ${daysPerFrequency} days per month`}`
                    }
                </p>
            </div>
            <Link className="project__table" to={`/table/${project.id}`}>
                <button className="card__btn">
                    Table
                </button>
            </Link>
            <Link className="project__dash" to={`/dashboard/${project.id}`}>
                <button 
                className="card__btn"
                onMouseOver={e => {
                    const svgs = [...e.currentTarget.firstElementChild.children]
                    svgs.forEach(svg => {
                            svg.classList.remove("icon__gray")
                            svg.classList.add("icon__hovered")
                        })
                    }}
                    onMouseOut={e => {
                        const svgs = [...e.currentTarget.firstElementChild.children]
                        svgs.forEach(svg => {
                            svg.classList.remove("icon__hovered")
                            svg.classList.add("icon__gray")
                        })
                    }}
                >
                    <IconGraph color="icon__gray" />
                    <span className="btn__text">
                        Dashboard
                    </span>
                </button>
            </Link>

            <ProgressCard project={project} />
        </article>
    )
}