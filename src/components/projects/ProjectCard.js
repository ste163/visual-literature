import React from "react"
import { IconArrow } from "../icons/IconArrow"
import { IconDots } from "../icons/IconDots"
import { IconGraph } from "../icons/IconGraph"
import "./ProjectCard.css"

export const ProjectCard = ({project}) => (
    <article className="card card__project">
        <button className="card__btn project__arrow"><IconArrow color="icon__gray" /></button>
        <button className="card__btn project__dots"><IconDots color="icon__gray" /></button>
        <h2 className="project__h2--card">{project.name}</h2>
        <div className="project__subtitle project__subtitle--type">{project.type.name}</div>
        <div className="project__subtitle project__subtitle--date">Started on {project.dateStarted}</div>
        <button className="card__btn project__dash">
            <IconGraph color="icon__gray" />
            <span className="btn__text">
                Display on Dashboard
            </span>
            </button>
    </article>
)