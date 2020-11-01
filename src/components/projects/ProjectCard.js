import React, {useRef} from "react"
import { Link } from "react-router-dom"
import { IconGraph } from "../icons/IconGraph"
import { DotMenu } from "./ProjectDotMenu"
import { ProgressCard } from "../progress/ProgressCard"
import "./ProjectCard.css"

// To get the colors to change on icon hover,
// will need an on mouseEnter and on mouseLeave event
// That changes the color class.

export const ProjectCard = ({project}) => {
    
    const dotMenu = useRef()

    return (
        <article className="card card__color--white card__project">
            <DotMenu ref={dotMenu} project={project}/>

            <h2 className="project__h2--card">{project.name}</h2>  
            <div className="project__subtitle project__subtitle--type">{project.type.name}</div>
            <div className="project__subtitle project__subtitle--date">Started on {project.dateStarted}</div>
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
                        Display on Dashboard
                    </span>
                </button>
            </Link>

            <ProgressCard project={project} />
        </article>
    )
}