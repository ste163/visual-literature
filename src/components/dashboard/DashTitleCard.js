import React from "react"
import { LinkTable } from "./LinkTable"

export const DashTitleCard = props => (
    <section className="card card__color--white card__dash card__dash--title">
        <h2 className="dash__h2">{props.props.name}</h2>
        <p className="dash__subtitle">{props.props.type.name}</p>
        <p className="dash__subtitle">{props.props.dateStarted}</p>
        <h3 className="dash__h3--goal">Goal</h3>
        <p className="dash__p dash__p--goal">
            Write {props.props.wordCountGoal} words {
                props.props.goalFrequency === "daily" ? "daily" :
                    props.props.goalFrequency === "weekly" ? `${props.props.daysPerFrequency} days per week` : `${props.props.daysPerFrequency} days per month`
            }.
        </p>
        <LinkTable props={props.props.id} />
    </section>
)