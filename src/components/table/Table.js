import React from "react"
import "./Table.css"

export const Table = props => {

    const incomingProject = props.props

    // Table rows MUST be generated based on the current amount of days in current month
    // Will need to import date-fns and setup a loop that generates all rows based on that
    // And inserts the date, placeholder min-goal text, and check boxes

    return (
        <div className="card card__color--white card--table">
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
                    <tr>
                        <td>2020/11/02</td>
                        <td>500</td>
                        <td></td>
                        <td>X</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>2020/11/03</td>
                        <td>564</td>
                        <td></td>
                        <td>X</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>2020/11/04</td>
                        <td>223</td>
                        <td>X</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>2020/11/05</td>
                        <td>329</td>
                        <td></td>
                        <td></td>
                        <td>X</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}