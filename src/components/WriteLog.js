import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { AuthView } from "./auth/AuthView"
import "./WriteLog.css"

export const WriteLog = () => (
    <div className="root__container"
    // LOOK INTO REFACTORING THIS LATER
    // onClick handles if user opens a 3-dot menu,
    // this script will close it when you click on the screen. 
    onClick={e => {
        if (document.querySelector(".dot__btns--active") !== null) {
            let dotMenu = document.querySelector(".dot__btns--active")
            if (e.target.className !== "dot__btns--active"
                && e.target.className !== "dot__btn"
                && e.target.className !== "dot__menu"
                && e.target.className.baseVal !== "icon__dots"
                && e.target.className.baseVal !== "icon__gray"
                ) {
                dotMenu.className = "dot__btns--inactive"
            }
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