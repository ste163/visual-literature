import React from "react"
import { Redirect, Route } from "react-router-dom"
import { ProjectProvider } from "./projects/ProjectProvider"
import { ProgressProvider } from "./progress/ProgressProvider"
import { SettingsProvider } from "./settings/SettingsProvider"
import { TypeProvider } from "./type/TypeProvider"
import { Header } from "./header/Header"
import { ProjectView } from "./projects/ProjectView"
import { DashboardView } from "./dashboard/DashboardView"
import { TableView } from "./table/TableView"
import { Footer } from "./footer/Footer"

export const ApplicationViews = () => {

    const defaultView = sessionStorage.getItem("defaultView")

    return (
    <> 
        <ProjectProvider>
            <SettingsProvider>
                
                <Header />

                <TypeProvider>
                    <ProgressProvider>

                        <Route exact path="/">
                            <Redirect to={defaultView} />
                        </Route>

                        <Route exact path="/projects">                    
                            <ProjectView />  
                        </Route>

                        <Route exact path="/table">
                            <TableView />
                        </Route>

                        <Route exact path="/table/:projectId">
                            <TableView />
                        </Route>
            
                        <Route exact path="/dashboard">
                            <DashboardView />
                        </Route>
            
                        <Route exact path="/dashboard/:projectId">
                            <DashboardView />
                        </Route>
                
                    </ProgressProvider>
                </TypeProvider>
            </SettingsProvider>
        </ProjectProvider>
        
        <Footer />
    </>
    )
}