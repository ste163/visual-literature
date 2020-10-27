import React from "react"
import { Redirect, Route } from "react-router-dom"
import { ProjectProvider } from "./projects/ProjectProvider"
import { ProgressProvider } from "./progress/ProgressProvider"
import { TypeProvider } from "./type/TypeProvider"
import { Header } from "./header/Header"
import { ProjectList } from "./projects/ProjectList"
import { Dashboard } from "./dashboard/Dashboard"
import { Footer } from "./footer/Footer"

export const ApplicationViews = () => {
    // If user will be able to decide default view as either
    // project or dashboard, then an if statement
    // will need to go on the route exact path "/"
    // checking what the user has selected as the default view
    return (
    <> 
        <Header />

        <ProgressProvider>
                <TypeProvider>

                    <ProjectProvider>
                        <Route exact path="/">
                            <Redirect to="/projects" />
                        </Route>

                        <Route exact path="/projects">                    
                            <ProjectList />  
                        </Route>
                    </ProjectProvider>

                    <ProjectProvider>
                        <Route exact path="/dashboard">
                            <Dashboard />
                        </Route>
            
                        <Route exact path="/dashboard/:projectId(\d+)">
                            <Dashboard />
                        </Route>
                    </ProjectProvider>
                    
                </TypeProvider>
        </ProgressProvider>
        
        <Footer />
    </>
    )
}