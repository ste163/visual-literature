import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { AuthView } from "./auth/AuthView"
import "./WriteLog.css"

export const WriteLog = () => (
    <div className="root__container"
    onClick={e => {
        if (e.target.className !== "dot__btns--active" && e.target.className !== "dot__btn") {
            console.log("CLOSE THE MENU", e.target.className)
        } else {
            console.log("KEEP MENU OPEN")
        }
    }}>

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

    </div>
)