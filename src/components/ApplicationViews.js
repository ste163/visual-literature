import React from "react"
import { Redirect, Route } from "react-router-dom"
import { Header } from "./header/Header"
import { Footer } from "./footer/Footer"
import { ProjectProvider } from "./projects/ProjectProvider"
import { ProjectList } from "./projects/ProjectList"

export const ApplicationViews = () => {
    // If user will be able to decide default view as either
    // project or dashboard, then another if statement
    // will need to go on the route exact path "/"
    return (
    <> 
        <Route path="/">
            <Header />
            <Redirect to="/projects" />
        </Route>

        <Route exact path="/projects">
            <ProjectProvider>
                <ProjectList />
                <Footer />
            </ProjectProvider>
        </Route>
    </>
    )
}