import React from "react"
import { Redirect, Route } from "react-router-dom"
import { ProjectProvider } from "./projects/ProjectProvider"
import { ProjectList } from "./projects/ProjectList"

export const ApplicationViews = () => {
    return (
    <> 
        <Route exact path="/">
            <Redirect to="/projects" />
        </Route>

        <Route exact path="/projects">
            <ProjectProvider>
                <ProjectList />
            </ProjectProvider>
        </Route>
    </>
    )
}