import React from "react"

export const DashGoalCard = (props) => {
    console.log(props)

    return (
        <section className="card card__color--white card__dash">
            {
            props.props === undefined ? null : 
                <>
                <h3 className="dash__h3">Goal</h3>
                <p className="dash__p">
                    Write {props.props.wordCountGoal} words {
                        props.props.goalFrequency === "daily" ? "daily" :
                            props.props.goalFrequency === "weekly" ? "per week" : "per month"
                    }.
                </p>
                </>
               
            }
        </section>
    )
}