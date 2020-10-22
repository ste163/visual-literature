import React, { useContext, useState, useEffect} from "react"
// IMPORT PROGRESS PROVIDER
import "./ProgressForm.css"

export const ProgressForm = props => {

    // Storing projectId to pass into the provider for getting
    // progress for current project, on current date
    // IF there is progress in the database for this date,
    // then you edit
    const projectId = props.projectId

    const createProject = (e) => {
        e.preventDefault()
        // constructNewProject()
    }

    return (
        <form className="form__progress" onSubmit={createProject}>

            <h3 className="form__h3">
                Add Progress    
            </h3>        

        </form>
    )

}