import React from "react"
import { Route, Redirect } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./WriteLog.css"

export const WriteLog = () => (
    <>
    <Route render={() => {
        if (sessionStorage.getItem("userId")) {
            // If user will be able to decide default view as either
            // project or dashboard, then another if statement
            // will need to go here.
            return <Redirect to="/projects" />
        } else {
            return <Redirect to="/login" />
        }
    }} />

    <Route exact path="/login">
        <Login />
    </Route>
    <Route exact path="/register">
        <Register />
    </Route>
    </>
)