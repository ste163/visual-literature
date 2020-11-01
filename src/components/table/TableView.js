import React from "react"
import { IconDivider } from "../icons/IconDivider"
import { Table } from "./Table"
import "./TableView.css"

export const TableView = () => {

// FETCH INFO FOR SELECTED PROJECT & CURRENT PROGRESS FOR SELECTED PROJECT


    return (
        <>
        <section className="view__header">
            VIEW HEADER
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