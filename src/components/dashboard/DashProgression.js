import React from "react"

// Will include ALL progress checks
// And display all data

export const DashProgression = (props) => {
    

    return (
        <>

        <section className="card card__color--white card__dash">
            Single progression bar chart for how you're doing meeting goals out of current month
        </section>

        <section className="card card__color--white card__dash">
            MET GOAL X TIMES THIS MONTH
        </section>

        <section className="card card__color--white card__dash">
            Goal progression bar chart, similar to the one on the progression menu
        </section>


        <section className="card card__color--white card__dash">
            Words written bar chart for current month
        </section>

        </>
    )

}