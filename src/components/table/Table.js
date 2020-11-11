import React from "react"
import { LinkDashboard } from "./LinkDashboard"
import "./Table.css"

// Generates the table based on passed in progress
export const Table = props => {

    const incomingProject = props.props
    const incomingProgress = props.progress

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
                                <td className="td--x">{`${singleProgress.revised === false ? "" : "X"}`}</td>
                                <td className="td--x">{`${singleProgress.edited === false ? "" : "X"}`}</td>
                                <td className="td--x">{`${singleProgress.proofread === false ? "" : "X"}`}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="table__btns">
                <LinkDashboard props={incomingProject.id} />
                <button className="btn btn--table"
                onClick={e => e.currentTarget.parentNode.parentNode.parentNode.childNodes[1].className = "background__modal modal__active"}>
                        Add/Edit Progress
                </button>
            </div>
        </section>
    )
}