import React from "react"
import { Redirect, Route } from "react-router-dom"
import { Header } from "./header/Header"
import { Footer } from "./footer/Footer"
import { ProjectProvider } from "./projects/ProjectProvider"
import { ProjectList } from "./projects/ProjectList"
import { TypeProvider } from "./type/TypeProvider"

export const ApplicationViews = () => {
    // If user will be able to decide default view as either
    // project or dashboard, then an if statement
    // will need to go on the route exact path "/"
    // checking what the user has selected as the default view
    return (
    <> 
        <Header />
        
        <ProjectProvider>
            <TypeProvider>

                <Route exact path="/">
                    <Redirect to="/projects" />
                </Route>

                <Route exact path="/projects">                    
                    <ProjectList />  
                </Route>
                
            </TypeProvider>
        </ProjectProvider>
        
        <Footer />
    </>
    )
}