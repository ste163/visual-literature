import React from "react"
import { IconDivider } from "../icons/IconDivider"
import { Table } from "./Table"
import "./TableView.css"

export const TableView = () => {

    // DATES
    const currentTime = new Date()
    const todaysDate = new Date(currentTime.getTime() - (currentTime.getTimezoneOffset() * 60000)).toISOString().split("T")[0]
    const currentMonthInt = currentTime.getMonth()
    const firstDayOfMonthFull =  new Date(currentTime.getFullYear(), currentTime.getMonth(), 1)
    const lastDayOfMonthFull = new Date(currentTime.getFullYear(), currentTime.getMonth() + 1, 0)
    const lastDayOfMonthInt = lastDayOfMonthFull.getDate()

    // FETCH INFO FOR SELECTED PROJECT & CURRENT PROGRESS FOR SELECTED PROJECT


    return (
        <>
        <section className="view__header">
            <fieldset className="view__projectSelect">
                <label className="projectSelect__label" htmlFor="projectSelect">Select project: </label>
                <select className="projectSelect__select">
                    <option value="CurrentProject">Test Project</option>
                </select>
            </fieldset>

            <IconDivider color="icon__lightGray" />

            <fieldset className="view__sort">
            <label className="sort__label" htmlFor="month">View by month: </label>
            <select className="sort__select" name="month" id="month">
                <option value="CurrentMonth">November</option>
            </select>
            <label className="sort__label" htmlFor="year">View by year: </label>
            <select className="sort__select sort__select--year" name="year" id="year">
                <option value="currentYear">2020</option>
            </select>
            </fieldset>

            <IconDivider color="icon__lightGray" />
        </section>

        <section className="view__container">
            <div className="table__container">
                <Table />
            </div>
        </section>
        </>
    )
}