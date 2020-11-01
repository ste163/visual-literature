import React from "react"

export const Table = () => {

    // Table rows MUST be generated based on the current amount of days in current month
    // Will need to import date-fns and setup a loop that generates all rows based on that
    // And inserts the date, placeholder min-goal text, and check boxes

    return (
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
                    <td>2020/11/01</td>
                    <td>500</td>
                    <td></td>
                    <td>X</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    )
}