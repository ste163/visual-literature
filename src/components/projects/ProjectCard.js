import React from "react"
import "./ProjectCard.css"

export const ProjectCard = ({project}) => (
    <article className="card card__project">
        <button className="project__arrow">MORE</button>
        <button className="project__dots">&#8226; &#8226; &#8226;</button>
        <h2 className="project__h2--card">{project.name}</h2>
        <div className="project__subtitle project__subtitle--type">{project.type.name}</div>
        <div className="project__subtitle project__subtitle--date">Started on {project.dateStarted}</div>
        <button className="project__dash">Display on Dashboard</button>
    </article>
)