import React from "react"
import "./Table.css"

export const Table = props => {

    const incomingProject = props.props
    const incomingProgress = props.progress
    console.log("INCOMING TABLE PROG", incomingProgress)

    // Table rows MUST be generated based on the current amount of days in current month
    // Will need to import date-fns and setup a loop that generates all rows based on that
    // And inserts the date, placeholder min-goal text, and check boxes

    return (
        <section className="card card__color--white card--table">
            <h2 className="table__h2">{incomingProject.name}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Words Written</th>
                        <th>Revised</th>
                        <th>Edited</th>
                        <th>Proofread</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        incomingProgress.map(singleProgress => (
                            <tr key={singleProgress.id}>
                                <td>{singleProgress.dateEntered}</td>
                                <td>{singleProgress.wordsWritten}</td>
                                <td>{singleProgress.revised}</td>
                                <td>{singleProgress.edited}</td>
                                <td>{singleProgress.proofread}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </section>
    )
}