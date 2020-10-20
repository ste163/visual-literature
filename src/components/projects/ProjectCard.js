import React from "react"
import "./ProjectCard.css"

export const ProjectCard = ({project}) => (
    <article className="card card__project">
        <button>MORE OPTIONS</button>
        <button>EXPAND</button>
        <h2 className="project__h2--card">{project.name}</h2>
        <div className="project__subtitle">PROJECT TYPE, EXPAND</div>
        <div className="project__subtitle">Started on, {project.dateStarted}</div>
        <button>Display on Dashboard</button>
    </article>
)