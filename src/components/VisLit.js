import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { AuthView } from "./auth/AuthView"

export const VisLit = () => (
    <>

    <Route render={() => {
        if (sessionStorage.getItem("userId")) {
            return (
                <ApplicationViews />
            )
        } else {
            return <Redirect to="/login" />
        }
    }} />

    <Route exact path="/login">
        <AuthView />
    </Route>

    </>
)