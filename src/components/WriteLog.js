import React from "react"
import { Route, Redirect } from "react-router-dom"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./WriteLog.css"

export const WriteLog = () => (
    <>
    <Route render={() => {
        if (sessionStorage.getItem("userId")) {
            return (
                <>
                <h1>LOGGED IN</h1>
                </>
            )
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