import React from "react"
import "./ProjectCard.css"

export const ProjectCard = ({project}) => (
    <article className="card card__project">
        <button>MORE OPTIONS</button>
        <button className="btn__dots">&#8226; &#8226; &#8226;</button>
        <h2 className="project__h2--card">{project.name}</h2>
        <div className="project__subtitle">{project.type.name}</div>
        <div className="project__subtitle">Started on {project.dateStarted}</div>
        <button>Display on Dashboard</button>
    </article>
)