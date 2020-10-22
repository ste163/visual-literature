import React from "react"
import "./ProgressCard.css"

export const ProgressCard = (props) => {
    
    console.log(props.projectId)

    return (
    <section className="card card__color--orange card__progress">
        <div className="progress__content">
            <h3 className="progress_h3">Goal</h3>
            <p className="progress_p">XX words, XX days a XX OR daily</p>
            <h3 className="progress_h3">Progress</h3>
            PROGRESS BAR
            <p className="progress_p">XX / XX words written</p>
            <p className="progress_p">XX days left OR none if daily</p>
        </div>
        <button className="btn btn--purple">Add Progress</button>
    </section>
    )
}